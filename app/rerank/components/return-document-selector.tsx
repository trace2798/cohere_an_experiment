import * as React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // Import the Switch component
import { useState } from "react";

import { UseFormSetValue } from "react-hook-form";

import { HoverContentComponent } from "@/components/HoverContentCompoent";

type PromptFormValues = {
  query: string;
  model: string;
  documents: (object | string)[];
  top_n: number;
  return_documents: boolean;
};

interface ReturnDocumentProps {
  setValue: UseFormSetValue<PromptFormValues>;
  returnDocuments: boolean; // Add this prop to receive the selected return_documents value
  hoverContentProps: {
    type: string;
    defaultValue: string;
    options: string[];
    functionality: string;
    note: string;
  };
}

export function ReturnDocument({
  setValue,
  returnDocuments,
  hoverContentProps,
}: ReturnDocumentProps) {
  const handleReturnDocumentChange = (value: boolean) => {
    setValue("return_documents", value); // Update the return_documents property in the form data
  };

  return (
    <>
      <div className="flex justify-between p-3 m-3 border rounded-lg w-fill dark:border-slate-800">
        <div className="flex items-center justify-center w-full">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="return_documents"> return_documents</Label>
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
          {/* Use the Switch component here */}
          <Switch
            checked={returnDocuments}
            // @ts-ignore
            onCheckedChange={handleReturnDocumentChange}
          />
        </div>
      </div>
    </>
  );
}
