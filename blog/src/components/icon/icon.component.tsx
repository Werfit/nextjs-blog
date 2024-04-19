import { combineClassNames } from "@/utils/class-name.util";

type IconProps = {
  name: string;
  filled?: boolean;
  className?: string;
  onClick?: () => void;
};

const Icon: React.FC<IconProps> = ({ name, filled, className, onClick }) => (
  <span
    className={combineClassNames(
      `material-symbols-outlined my-2`,
      filled ? "material-symbols-filled" : "",
      className,
    )}
    onClick={onClick}
  >
    {name}
  </span>
);

export { Icon };
