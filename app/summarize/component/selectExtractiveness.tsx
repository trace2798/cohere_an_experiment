import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UseFormSetValue } from "react-hook-form";
import { Label } from "@radix-ui/react-label";

import { HoverContentComponent } from "@/components/HoverContentCompoent";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
type PromptFormValues = {
  text: string;
  length: string;
  format: string;
  model: string;
  extractiveness: string;
  temperature: number;
};

interface SelectModelProps {
  setValue: UseFormSetValue<PromptFormValues>;
}

export function SelectExtractiveness({ setValue }: SelectModelProps) {
  const handleFormatChange = (value: string) => {
    setSelectedExtractiveness(value);
    setValue("extractiveness", value); // Update the format property in the form data
  };

  const [selectedExtractiveness, setSelectedExtractiveness] = useState("low");

  return (
    <>
      <div className="flex justify-between p-3 m-3 border rounded-lg w-fill border-slate-800">
        <div className="flex items-center justify-center w-full">
          <HoverCard openDelay={100}>
            <HoverCardTrigger asChild>
              <Label htmlFor="extractiveness">Extractiveness</Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="left"
            >
              <HoverContentComponent
                type="string"
                defaultValue="auto"
                options={["low", "medium", "high", "auto"]}
                functionality="Controls how close to the original text the summary is. high extractiveness summaries will lean towards reusing sentences verbatim, while low extractiveness summaries will tend to paraphrase more."
                note="If auto is selected, the best option will be picked based on the input text."
              />
            </HoverCardContent>
          </HoverCard>
        </div>
        <div>
          <Select
            value={selectedExtractiveness}
            onValueChange={handleFormatChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>{selectedExtractiveness}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Summary Extractiveness</SelectLabel>
                {["low", "medium", "high", "auto"].map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
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
