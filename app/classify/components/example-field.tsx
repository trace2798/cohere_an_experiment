import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { HoverContentComponent } from "@/components/HoverContentCompoent";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

type ExampleFieldProps = {
  examples: Array<{ text: string; label: string }>;
  isLoading: boolean;
  addExampleField: () => void;
  hoverContentProps: {
    type: string;
    defaultValue: string;
    options: string[];
    functionality: string;
    note: string;
  };
};

export const ExampleField: React.FC<ExampleFieldProps> = ({
  examples,
  isLoading,
  addExampleField,
  hoverContentProps,
}) => {
  return (
    <>
      <div className="px-2 pt-3 border rounded-md md:px-5 border-slate-600/40">
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Label htmlFor="examples" className="pl-3 text-left w-fit">
              examples (required) [type: array of objects]
            </Label>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-[260px] text-sm"
            side="left"
          >
            <HoverContentComponent {...hoverContentProps} />
          </HoverCardContent>
        </HoverCard>
        {examples.map((example, index) => (
          <div key={index} className="flex flex-col my-3 md:flex-row">
            <FormField
              name={`examples[${index}].text`}
              render={({ field }) => (
                <FormItem className="w-full col-span-12 lg:col-span-5">
                  <FormControl className="p-0 m-0">
                    <Input
                      className="pl-3 border border-primary-foreground focus-visible:ring-0 focus-visible:ring-transparent "
                      disabled={isLoading}
                      placeholder="Enter text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name={`examples[${index}].label`}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-5">
                  <FormControl className="p-0 m-0">
                    <Input
                      className="pl-3 mt-2 border md:mt-0 md:ml-3 border-primary-foreground focus-visible:ring-0 focus-visible:ring-transparent "
                      disabled={isLoading}
                      placeholder="Enter label"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          className="col-span-12 p-5 mt-5 w-fit lg:col-span-12"
          type="button"
          onClick={addExampleField}
          size="icon"
          variant="ghost"
        >
          Add example fields <PlusCircleIcon className="w-5 ml-5 " />
        </Button>
      </div>
    </>
  );
};
