import { Arvo } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/images/logo.svg";
import { combineClassNames } from "@/utils/class-name.util";

import { ActionsIcon } from "./mobile/actions-icon";
import { AuthenticatedActions } from "./navigation-actions/authenticated-actions.component";
import { NavigationActions } from "./navigation-actions/navigation-actions.component";
import { PublicActions } from "./navigation-actions/public-actions.component";

const caveat = Arvo({
  weight: "400",
  subsets: ["latin"],
});

type NavigationProps = {
  className?: string;
};

const Navigation: React.FC<NavigationProps> = ({ className }) => (
  <nav className="grid-container !col-start-[full-screen] col-end-[full-screen] w-full bg-white shadow-sm shadow-black-500/10">
    <div
      className={combineClassNames(
        `!col-start-[container] col-end-[container] grid grid-cols-2 items-center justify-between gap-8 bg-white py-2 sm:px-0 md:!col-start-[full-screen] md:col-end-[full-screen] md:grid-cols-7 lg:grid-cols-9`,
        className,
      )}
    >
      <Link
        href="/"
        className="flex flex-grow items-center gap-2 md:col-span-2"
      >
        <Image src={Logo} alt="Logo" width={20} />
        <h2 className={caveat.className}>Werfit Blog</h2>
      </Link>

      <div className="hidden grid-cols-subgrid items-center md:col-span-5 md:grid lg:col-span-7">
        <div className="text-black col-span-2 flex justify-center gap-4 font-medium tracking-wider text-grayBlue-500 md:col-span-2 lg:col-span-4">
          <Link href="/" className="transition hover:text-black-500">
            Home
          </Link>
          <Link href="/search" className="transition hover:text-black-500">
            Connect
          </Link>
        </div>
        <div className="hidden items-center justify-end gap-2 sm:flex md:col-span-3">
          <NavigationActions
            authenticatedChildren={
              <AuthenticatedActions></AuthenticatedActions>
            }
            publicChildren={<PublicActions />}
          />
        </div>
      </div>

      <div className="text-right md:hidden">
        <ActionsIcon className="cursor-pointer" />
      </div>
    </div>
  </nav>
);

export { Navigation };
