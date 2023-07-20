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
    </>
  );
}
