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
type PromptFormValues = {
  text: string;
  length: string;
};

interface SelectLengthProps {
  setValue: UseFormSetValue<PromptFormValues>;
}

export function SelectLength({ setValue }: SelectLengthProps) {
    const handleLengthChange = (value: string) => {
      setSelectedLength(value);
      setValue("length", value); // Update the length property in the form data
    };
  
    const [selectedLength, setSelectedLength] = useState("medium");
  
    return (
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
    );
  }