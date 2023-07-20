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

interface SelectFormatProps {
  setValue: UseFormSetValue<PromptFormValues>;
}

export function SelectFormat({ setValue }: SelectFormatProps) {
  const handleFormatChange = (value: string) => {
    setSelectedFormat(value);
    setValue("format", value); // Update the format property in the form data
  };

  const [selectedFormat, setSelectedFormat] = useState("paragraph");

  return (
    <>
      <div className="flex justify-between p-3 m-3 border rounded-lg w-fill border-slate-800">
        <div className="flex items-center justify-center w-full">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="temperature" className="mr-10">Format</Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="left"
            >
              <HoverContentComponent
                type="string"
                defaultValue="paragraph"
                options={["paragraph", "bullets", "auto"]}
                functionality="Indicates the style in which the summary will be delivered - in a free form paragraph or in bullet points."
                note=" If auto is selected, the best option will be picked based on the input text."
              />
            </HoverCardContent>
          </HoverCard>
        </div>
        <div>
          <Select value={selectedFormat} onValueChange={handleFormatChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>{selectedFormat}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Summary Format</SelectLabel>
                {["paragraph", "bullets", "auto"].map((format) => (
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
