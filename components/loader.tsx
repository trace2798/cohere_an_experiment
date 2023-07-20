import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface LoaderProps {
  description: string;
}

export const Loader: FC<LoaderProps> = ({ description }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-y-4">
      <div className="relative w-10 h-10 animate-spin">
        {/* <Image
          alt="Logo"
          src="/logo.png"
          fill
        /> */}
        <LoaderIcon/>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
