import { combineClassNames } from "@/utils/class-name.util";

type LoadingSkeletonProps = {
  className?: string;
};

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className }) => (
  <div
    className={combineClassNames(className, "flex flex-col gap-10 md:flex-row")}
  >
    <div className="h-40 w-full animate-pulse rounded-3xl bg-slate-100 md:w-40"></div>
    <div className="flex h-48 flex-1 animate-pulse flex-col gap-4 rounded-md bg-slate-100"></div>
  </div>
);

export { LoadingSkeleton };
