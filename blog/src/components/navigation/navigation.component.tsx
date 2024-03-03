import Image from "next/image";
import { Arvo } from "next/font/google";
import { AuthButtons } from "@/components/navigation/auth-buttons.component";
import Logo from "@/assets/images/logo.svg";
import Link from "next/link";
import { Search } from "@/components/search/search.component";
import { FavoritesIcon } from "@/components/favorites/favorites-icon.component";

const caveat = Arvo({
  weight: "400",
  subsets: ["latin"],
});

const Navigation = async () => {
  return (
    <nav className="flex justify-between px-20 items-center py-5 gap-8 flex-wrap">
      <div className="flex items-center gap-2 flex-grow">
        <Image src={Logo} alt="Logo" width={20} />
        <h2 className={caveat.className}>Werfit Blog</h2>
      </div>
      <div className="justify-center flex gap-6 tracking-wider text-black">
        <Link href="#" className="hover:text-black-500 transition">
          Home
        </Link>
        <Link href="#" className="hover:text-black-500 transition">
          Learn
        </Link>
        <Link href="#" className="hover:text-black-500 transition">
          Connect
        </Link>
      </div>

      <div className="flex justify-center items-stretch gap-2">
        <Search />
        <FavoritesIcon />
      </div>

      <div className="flex gap-3 items-center">
        <AuthButtons />
      </div>
    </nav>
  );
};

export { Navigation };
