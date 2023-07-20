import React, { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Slider } from "@/components/ui/slider";

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
      <Slider
        id="temperature"
        max={5}
        defaultValue={[selectedTemperature]}
        step={0.1}
        onValueChange={handleTemperatureChange}
        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
        aria-label="Temperature"
      />
    </>
  );
}
