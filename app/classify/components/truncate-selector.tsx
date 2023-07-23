"use client";
import * as React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { UseFormSetValue } from "react-hook-form";

import { HoverContentComponent } from "@/components/HoverContentCompoent";
import { Truncate } from "@/typing";

type PromptFormValues = {
  texts: string[];
  model: string;
  truncate: string;
};

interface SelectTruncateProps {
  setValue: UseFormSetValue<PromptFormValues>;
  truncate: Truncate[]; // Add this prop to receive the selected model
  hoverContentProps: {
    type: string;
    defaultValue: string;
    options: string[];
    functionality: string;
    note: string;
  };
}

export function SelectTruncate({
  truncate,
  setValue,
  hoverContentProps,
}: SelectTruncateProps) {
  const handleFormatChange = (value: string) => {
    setSelectedTruncate(value);
    setValue("truncate", value); // Update the format property in the form data
  };

  const [selectedTruncate, setSelectedTruncate] = useState("END");

  return (
    <>
      <div className="flex justify-between p-3 m-3 border rounded-lg w-fill dark:border-slate-800">
        <div className="flex items-center justify-center w-full">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="truncate">truncate</Label>
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
          <Select value={selectedTruncate} onValueChange={handleFormatChange}>
            <SelectTrigger className="w-fit md:w-[180px]">
              <SelectValue>{selectedTruncate}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a Model</SelectLabel>
                {truncate.map((trunc) => (
                  <SelectItem key={trunc.id} value={trunc.truncate}>
                    {trunc.truncate}
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
