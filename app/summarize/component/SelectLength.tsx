import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UseFormSetValue, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HoverContentComponent } from "@/components/HoverContentCompoent";
type PromptFormValues = {
  text: string;
  length: string;
  format: string;
  model: string;
  extractiveness: string;
  temperature: number;
};

interface SelectLengthProps {
  setValue: UseFormSetValue<PromptFormValues>;
}

export function SelectLength({ setValue }: SelectLengthProps) {
  //   const { watch } = useFormContext<PromptFormValues>();
  //   const length = watch("length");

  //   useEffect(() => {
  //     setSelectedLength(length);
  //   }, [length]);
  const handleLengthChange = (value: string) => {
    setSelectedLength(value);
    setValue("length", value); // Update the length property in the form data
  };

  const [selectedLength, setSelectedLength] = useState("medium");

  return (
    <>
      <div className="flex justify-between w-full my-3">
        <div className="flex items-center justify-center w-full">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="temperature">Length</Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="left"
            >
              <HoverContentComponent
                type="string"
                defaultValue="medium"
                options={["short", "medium", "long", "auto"]}
                functionality="Indicates the approximate length of the summary."
                note="If auto is selected, the best option will be picked based on the input text."
              />
            </HoverCardContent>
          </HoverCard>
        </div>
        <div>
          <Select value={selectedLength} onValueChange={handleLengthChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>{selectedLength}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Summary Length</SelectLabel>
                {["short", "medium", "long", "auto"].map((length) => (
                  <SelectItem key={length} value={length}>
                    {length}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
