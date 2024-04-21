import { combineClassNames } from "@/utils/class-name.util";

type SkeletonProps = {
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div
    className={combineClassNames(
      "animate-pulse rounded-md bg-slate-100",
      className,
    )}
  ></div>
);

export { Skeleton };
