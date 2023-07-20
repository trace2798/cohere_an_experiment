import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
}

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <>
      <div className="flex items-center px-4 mb-8 lg:px-8 gap-x-3">
        <div>
          <h2 className="text-3xl font-bold text-neutral-50">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </>
  );
};
