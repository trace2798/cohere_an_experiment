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
import { Generations } from "@/typing";

type PromptFormValues = {
  prompt: string;
  model: string;
  num_generations: number;
  temperature: number;
  max_tokens: number;
  truncate: string;
};

interface SelectNumberOfGenerationProps {
  setValue: UseFormSetValue<PromptFormValues>;
  generation: Generations[]; // Add this prop to receive the selected model
  hoverContentProps: {
    type: string;
    defaultValue: string;
    options: string[];
    functionality: string;
    note: string;
  };
}

export function SelectNumberOfGeneration({
  generation,
  setValue,
  hoverContentProps,
}: SelectNumberOfGenerationProps) {
  const handleFormatChange = (value: string) => {
    setSelectNumberOfGeneration(value);
    setValue("num_generations", parseInt(value, 10)); // Update the format property in the form data
  };

  const [selectNumberOfGeneration, setSelectNumberOfGeneration] = useState("1");

  return (
    <>
      <div className="flex justify-between p-3 m-3 border rounded-lg w-fill dark:border-slate-800">
        <div className="flex items-center justify-center w-full">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="num_generation">num_generation</Label>
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
          <Select value={selectNumberOfGeneration} onValueChange={handleFormatChange}>
            <SelectTrigger className="w-fit md:w-[180px]">
              <SelectValue>{selectNumberOfGeneration}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Number of Generation</SelectLabel>
                {generation.map((num) => (
                  <SelectItem key={num.id} value={num.numberOfGenerations.toString()}>
                    {num.numberOfGenerations}
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
