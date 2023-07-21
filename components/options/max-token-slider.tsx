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
};

interface MaxTokenSliderProps {
  setValue: UseFormSetValue<PromptFormValues>;
  hoverContentProps: {
    type: string;
    defaultValue: string;
    options: string[];
    functionality: string;
    note: string;
  };
}

export function MaxTokenSliderComponent({
  setValue,
  hoverContentProps,
}: MaxTokenSliderProps) {
  const handleTokenAmountChange = (value: number[]) => {
    setSelectedTokenAmount(value[0]);
    setValue("max_tokens", value[0]); // Update the temperature property in the form data
  };

  const [selectedTokenAmount, setSelectedTokenAmount] = useState(1000);

  return (
    <>
      <div className="flex flex-col my-5">
        <div className="flex justify-between mb-3">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="max_tokens">max_tokens</Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="left"
            >
              <HoverContentComponent {...hoverContentProps} />
            </HoverCardContent>
          </HoverCard>
          <p className="text-neutral-400">{selectedTokenAmount}</p>
        </div>
        <div>
          <Slider
            id="temperature"
            max={2048}
            defaultValue={[selectedTokenAmount]}
            step={1}
            onValueChange={handleTokenAmountChange}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            aria-label="Temperature"
          />
        </div>
      </div>
    </>
  );
}
