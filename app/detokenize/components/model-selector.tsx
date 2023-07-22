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
import { Model } from "@/typing";

type PromptFormValues = {
  tokens: number[];
  model: string;
 
};

interface SelectModelProps {
  setValue: UseFormSetValue<PromptFormValues>;
  models: Model[]; // Add this prop to receive the selected model
  hoverContentProps: {
    type: string;
    defaultValue: string;
    options: string[];
    functionality: string;
    note: string;
  };
}

export function SelectModel({
  models,
  setValue,
  hoverContentProps,
}: SelectModelProps) {
  const handleFormatChange = (value: string) => {
    setSelectedModel(value);
    setValue("model", value); // Update the format property in the form data
  };

  const [selectedModel, setSelectedModel] = useState("command");

  return (
    <>
      <div className="flex justify-between p-3 m-3 border rounded-lg w-fill dark:border-slate-800">
        <div className="flex items-center justify-center w-full">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="model">Model</Label>
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
          <Select value={selectedModel} onValueChange={handleFormatChange}>
            <SelectTrigger className="w-fit md:w-[180px]">
              <SelectValue>{selectedModel}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a Model</SelectLabel>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.name}>
                    {model.name}
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
