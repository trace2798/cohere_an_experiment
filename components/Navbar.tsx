import Image from "next/image";
import Link from "next/link";
import { Explore } from "./explore";
import { SearchSheet } from "./search-sheet";

const Navbar = async () => {
  return (
    <div className="fixed top-0 inset-x-0 h-fit dark:bg-zinc-800 border-b border-zinc-300 z-[10] py-2">
      <div className="container flex items-center justify-between h-full gap-2 pt-2 md:pt-0">
        {/* logo */}

        <Link href="/" className="flex items-center gap-2">
          <p className="text-sm font-medium text-zinc-700 md:block dark:text-neutral-200">
            <Image
              src="/images/logo.png"
              alt="logo"
              height={35}
              width={35}
              className="rounded-none"
            />
          </p>
        </Link>
        {/* <Link href="/explore">Explore</Link> */}
        <Explore />
        <div>
          <SearchSheet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
