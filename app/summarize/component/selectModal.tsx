import { HoverContentComponent } from "@/components/HoverContentCompoent";
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
      <div className="flex justify-between p-3 m-3 border rounded-lg w-fill border-slate-800">
        <div className="flex items-center justify-center w-full">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="temperature">Model</Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="left"
            >
              <HoverContentComponent
                type="string"
                defaultValue="summarize-xlarge"
                options={["summarize-xlarge", "summarize-medium"]}
                functionality="The ID of the model to generate the summary with."
                note="Smaller models are faster, while larger models will perform better."
              />
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
                <SelectLabel>Summary Model</SelectLabel>
                {["summarize-medium", "summarize-xlarge"].map((format) => (
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
