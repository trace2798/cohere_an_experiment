import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { HoverCardContent } from "@radix-ui/react-hover-card";
import { Label } from "@/components/ui/label";

type PromptFormValues = {
  text: string;
  length: string;
  format: string;
  model: string;
  extractiveness: string;
  temperature: number;
};

interface TemperatureSliderProps {
  setValue: UseFormSetValue<PromptFormValues>;
}

export function TemperatureSlider({ setValue }: TemperatureSliderProps) {
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
              Ranges from 0 to 5. Controls the randomness of the output. Lower
              values tend to generate more “predictable” output, while higher
              values tend to generate more “creative” output. The sweet spot is
              typically between 0 and 1.
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
