"use client";
import { HoverContentComponent } from "@/components/HoverContentCompoent";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { HeadingApi } from "@/components/ui/heading-api";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { SelectModel } from "../../components/options/model-selector";
import { hoverModelContent, models } from "./data/models";
import { SelectNumberOfGeneration } from "@/components/options/num-selector";
import {
  hoverNumGenerationContent,
  num_generations,
} from "./data/num_generations";
import { TemperatureSliderComponent } from "@/components/options/temperature-slider";
import { hoverTemperatureContent } from "./data/temperature";
import { MaxTokenSliderComponent } from "@/components/options/max-token-slider";
import { hoverMaxTokenContent } from "./data/max-tokens";
import { SelectTruncate } from "@/components/options/truncate-selector";
import { hoverTruncateContent, truncate } from "./data/truncate";

type PromptFormValues = {
  prompt: string;
  model: string;
  num_generations: number;
  temperature: number;
  max_tokens: number;
  truncate: string;
};

type Generation = {
  id: string;
  text: string;
  index: number;
  likelihood: number;
};

type CohereApiResponse = {
  prompt: string;
  generations: Generation[];
};

const GeneratePage = () => {
  const [messages, setMessages] = useState<CohereApiResponse[]>([]);

  const form = useForm<PromptFormValues>({
    defaultValues: {
      prompt: "",
      model: "command",
      num_generations: 1,
      temperature: 0.5,
      max_tokens: 1000,
      truncate: "END",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      console.log(values, "VALUES VALUES");
      const response = await axios.post("/api/generate", values); // Call the server-side API route
      setMessages((current) => [...current, response.data]);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="w-full p-5 rounded-lg md:p-10">
      <div className="w-full">
        <HeadingApi
          title="Generate"
          description="This endpoint generates realistic text conditioned on a given input."
          method="POST"
          link="https://api.cohere.ai/v1/generate"
          limit="For Trail keys: 5000 generation units per month."
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden md:flex-row lg:px-8">
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
            >
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <Label htmlFor="temperature" className="pl-3 text-left w-fit">
                    Prompt (required)
                  </Label>
                </HoverCardTrigger>
                <HoverCardContent
                  align="start"
                  className="w-[260px] text-sm"
                  side="left"
                >
                  <HoverContentComponent
                    type="string"
                    defaultValue="REQUIRED"
                    options={["N/A"]}
                    functionality="Represents the prompt or text to be completed."
                    note="Trailing whitespaces will be trimmed. If your use case requires trailing whitespaces contact Ivan."
                  />
                </HoverCardContent>
              </HoverCard>
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="pl-3 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent "
                        disabled={isLoading}
                        placeholder="Enter a prompt to generate answer"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Heading
                title="Available option"
                description="All set to default. Change to experiment."
              />
              <div className="grid w-full p-2 -mt-10 overflow-hidden xl:gap-2 2xl:grid-cols-2">
                <SelectModel
                  models={models}
                  setValue={form.setValue}
                  hoverContentProps={hoverModelContent}
                />
                <SelectNumberOfGeneration
                  generation={num_generations}
                  setValue={form.setValue}
                  hoverContentProps={hoverNumGenerationContent}
                />
                <TemperatureSliderComponent
                  setValue={form.setValue}
                  hoverContentProps={hoverTemperatureContent}
                />
                <MaxTokenSliderComponent
                  setValue={form.setValue}
                  hoverContentProps={hoverMaxTokenContent}
                />
                <SelectTruncate
                  truncate={truncate}
                  setValue={form.setValue}
                  hoverContentProps={hoverTruncateContent}
                />
              </div>

              <Button
                className="col-span-12 p-5 w-fit lg:col-span-12"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-5/6 space-y-4 md:w-1/2">
          {isLoading && (
            <div className="flex items-center justify-center w-full p-3 ml-5 rounded-lg w-fill bg-muted">
              <Loader description="Cohere is tokenizing your text." />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="Start Generating." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.prompt}
                className={cn(
                  "md:ml-5 p-3 w-fill flex items-start gap-x-8 rounded-lg",
                  "dark:bg-zinc-900 border border-black/10",
                  message.generations.length > 1 ? "flex-col" : "flex-row"
                )}
              >
                {message.generations?.map((generation) => (
                  <p key={generation.id} className="text-sm">
                    {generation.text}
                    {generation !==
                      message.generations[message.generations.length - 1] && (
                      <hr className="my-2" />
                    )}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
