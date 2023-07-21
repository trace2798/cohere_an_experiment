import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

import { Label } from "@/components/ui/label";
import { HoverContentComponent } from "@/components/HoverContentCompoent";

type PromptFormValues = {
  prompt: string;
  model: string;
  num_generations: number;
  temperature: number;
  max_tokens: number;
  truncate: string;
};

interface TemperatureSliderProps {
  setValue: UseFormSetValue<PromptFormValues>;
  hoverContentProps: {
    type: string;
    defaultValue: string;
    options: string[];
    functionality: string;
    note: string;
  };
}

export function TemperatureSliderComponent({
  setValue, hoverContentProps
}: TemperatureSliderProps) {
  const handleTemperatureChange = (value: number[]) => {
    setSelectedTemperature(value[0]);
    setValue("temperature", value[0]); // Update the temperature property in the form data
  };

  const [selectedTemperature, setSelectedTemperature] = useState(0.5);

  return (
    <>
      <div className="flex flex-col my-5">
        <div className="flex justify-between mb-3">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="temperature">Temperature</Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="left"
            >
              <HoverContentComponent {...hoverContentProps} />
            </HoverCardContent>
          </HoverCard>
          <p className="text-neutral-400">{selectedTemperature}</p>
        </div>
        <div>
          <Slider
            id="temperature"
            max={5}
            defaultValue={[selectedTemperature]}
            step={0.1}
            onValueChange={handleTemperatureChange}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            aria-label="Temperature"
          />
        </div>
      </div>
    </>
  );
}
