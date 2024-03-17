import { combineClassNames } from "@/utils/class-name.util";

type DividerProps = {
  className?: string;
};

const Divider: React.FC<DividerProps> = ({ className }) => (
  <div
    className={combineClassNames(
      "h-full min-h-6 w-0.5 rounded-sm bg-gray-100",
      className,
    )}
  ></div>
);

export { Divider };
