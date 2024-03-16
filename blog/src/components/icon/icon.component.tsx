type IconProps = {
  name: string;
  filled?: boolean;
  className?: string;
  onClick?: () => void;
};

const Icon: React.FC<IconProps> = ({ name, filled, className, onClick }) => (
  <span
    className={`${filled ? "material-symbols-filled" : ""} material-symbols-outlined my-2 ${className ?? ""}`}
    onClick={onClick}
  >
    {name}
  </span>
);

export { Icon };
