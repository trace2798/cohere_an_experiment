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

export function SelectModel({ setValue }: SelectModelProps) {
  const handleFormatChange = (value: string) => {
    setSelectedModel(value);
    setValue("model", value); // Update the format property in the form data
  };

  const [selectedModel, setSelectedModel] = useState("summarize-xlarge");

  return (
    <>
      <Select value={selectedModel} onValueChange={handleFormatChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue>{selectedModel}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Summary Model</SelectLabel>
            {["summarize-medium", "summarize-xlarge"].map((format) => (
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
