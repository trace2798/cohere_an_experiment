import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const Navbar = async () => {
  return (
    <div className="fixed top-0 inset-x-0 h-fit dark:bg-zinc-800 border-b border-zinc-300 z-[10] py-2">
      <div className="container flex items-center justify-between h-full gap-2 mx-auto max-w-7xl">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2">
          <p className="hidden text-sm font-medium text-zinc-700 md:block dark:text-neutral-200">
            Cohere Playground (Unofficial)
          </p>
        </Link>
        <Link href="/explore">Explore</Link>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
