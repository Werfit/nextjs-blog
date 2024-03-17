import { motion } from "framer-motion";
import { ANIMATION_CONFIG } from "@/constants/animation.constants";
import { useAnimationOnInitAndCleanup } from "@/hooks/use-animation-on-init-cleanup.hook";
import { Icon } from "../icon/icon.component";

type SlidingInputProps = {
  from: string;
  to: string;

  onClose?: () => void;
};

const SlidingInput: React.FC<SlidingInputProps> = ({ from, to, onClose }) => {
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
      <input
        type="text"
        className="w-full bg-transparent py-2 text-sm outline-none"
        spellCheck="false"
      ></input>

      <Icon name="close" className="cursor-pointer" onClick={onClose} />
    </motion.div>
  );
};

export { SlidingInput };
