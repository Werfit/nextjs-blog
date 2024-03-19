import Link from "next/link";
import { Search } from "@/components/search/search-icon.component";
import { combineClassNames } from "@/utils/class-name.util";

type PublicActionsProps = {
  className?: string;
};

const PublicActions: React.FC<PublicActionsProps> = ({ className }) => (
  <>
    <Search from="0px" to="150px" />
    <Link
      href="/auth"
      className={combineClassNames(
        "rounded-md bg-primary-500 px-6 py-2 font-medium tracking-wider text-white transition hover:bg-primary-400",
        className,
      )}
    >
      Sign In
    </Link>
  </>
);

export { PublicActions };
