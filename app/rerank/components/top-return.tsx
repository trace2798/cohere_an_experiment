import { HoverContentComponent } from "@/components/HoverContentCompoent";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";
import { UseFormSetValue } from "react-hook-form";

type PromptFormValues = {
  query: string;
  model: string;
  documents: (object | string)[];
  top_n: number;
  return_documents: boolean;
};

interface TopReturnProps {
  setValue: UseFormSetValue<PromptFormValues>;
  top_n: number;
  hoverContentProps: {
    type: string;
    defaultValue: string;
    options: string[];
    functionality: string;
    note: string;
  };
}

const TopReturn = ({ top_n, setValue, hoverContentProps }: TopReturnProps) => {
  const handleTopNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTopN = parseInt(event.target.value, 10);
    setValue("top_n", newTopN);
  };

  return (
    <>
      <div className="flex justify-between p-3 m-3 border rounded-lg w-fill dark:border-slate-800">
        <div className="flex items-center justify-center w-full">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="top_n">top_n</Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="left"
            >
              <HoverContentComponent {...hoverContentProps} />
            </HoverCardContent>
          </HoverCard>
        </div>
        <div>
          <Input
            type="number"
            pattern="^[1-9]\d*$"
            id="top_n"
            name="top_n"
            value={top_n}
            onChange={handleTopNChange}
          />
        </div>
      </div>
      <div>
        <label htmlFor="top_n">Top N:</label>
      </div>
    </>
  );
};

export default TopReturn;
