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
      <Select value={selectedExtractiveness} onValueChange={handleFormatChange}>
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
    </>
  );
}
