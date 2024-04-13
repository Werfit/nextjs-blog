import { motion } from "framer-motion";

import { ANIMATION_CONFIG } from "@/constants/animation.constants";
import { useAnimationOnInitAndCleanup } from "@/hooks/use-animation-on-init-cleanup.hook";

import { Input } from "../form/debounce-input.component";
import { Icon } from "../icon/icon.component";

type SlidingInputProps = {
  from: string;
  to: string;

  onChange?: (value: string) => void;
  onClose?: () => void;
};

const SlidingInput: React.FC<SlidingInputProps> = ({
  from,
  to,
  onClose,
  onChange,
}) => {
  const { scope } = useAnimationOnInitAndCleanup<HTMLDivElement>({
    onEnter: async (scope, animate) => {
      await animate(scope.current, { width: to, opacity: 1 }, ANIMATION_CONFIG);
    },
    onExit: async (scope, animate) => {
      await animate(
        scope.current,
        { width: from, opacity: 0 },
        ANIMATION_CONFIG,
      );
    },
  });

  return (
    <motion.div
      className="box-border flex items-center justify-end"
      initial={{ width: from, opacity: 0 }}
      ref={scope}
    >
      <Input
        type="text"
        className="w-full bg-transparent py-2 text-sm outline-none"
        spellCheck="false"
        autoFocus
        onChange={(value) => onChange?.(value?.toString() ?? "")}
      />

      <Icon name="close" className="cursor-pointer" onClick={onClose} />
    </motion.div>
  );
};

export { SlidingInput };
