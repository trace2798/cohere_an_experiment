import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExploreProps {}
const cardContentData = [
  {
    title: "Generate",
  },
  {
    title: "Embed",
  },
  {
    title: "Classify",
  },
  {
    title: "Tokenize",
  },
  {
    title: "Detokenize",
  },
  {
    title: "Detect Language",
  },
  {
    title: "Summarize",
  },
  {
    title: "Rerank",
  },
  {
    title: "Generate Code",
  },
];

export function Explore({}: ExploreProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="default">
          Explore
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <a href="/">Home</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/explore">Explore Page</a>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-800 bg-neutral-300 dark:text-gray-300 dark:bg-gray-900">
          Available Playgrounds
        </DropdownMenuItem>
        {cardContentData.map((option) => (
          <>
            <a href={option.title.replace(/\s+/g, "").toLowerCase()}>
              <DropdownMenuItem key={option.title}>
                {option.title}
              </DropdownMenuItem>
            </a>
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
