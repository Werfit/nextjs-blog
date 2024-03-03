type IconProps = {
  name: string;
  className?: string;
  onClick?: () => void;
};

const Icon: React.FC<IconProps> = ({ name, className, onClick }) => (
  <span
    className={`material-symbols-outlined my-2 ${className ?? ""}`}
    onClick={onClick}
  >
    {name}
  </span>
);

export { Icon };
