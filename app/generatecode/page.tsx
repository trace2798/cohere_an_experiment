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
import { hoverModelContent, models } from "../generate/data/models";
import { SelectNumberOfGeneration } from "@/components/options/num-selector";
import {
  hoverNumGenerationContent,
  num_generations,
} from "../generate/data/num_generations";
import { TemperatureSliderComponent } from "@/components/options/temperature-slider";
import { hoverTemperatureContent } from "../generate/data/temperature";
import { MaxTokenSliderComponent } from "@/components/options/max-token-slider";
import { hoverMaxTokenContent } from "../generate/data/max-tokens";
import ReactMarkdown from "react-markdown";

type PromptFormValues = {
  prompt: string;
  model: string;
  num_generations: number;
  temperature: number;
  max_tokens: number;
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
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      console.log(values, "VALUES VALUES");
      values.prompt = `Only generate your answer in markdown format. Finish each line in the same like. ${values.prompt}`;
      const response = await axios.post("/api/code", values); // Call the server-side API route
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
          title="Generate Code"
          description="Generating code with the Generate Api from Cohere."
          method="POST"
          link="https://api.cohere.ai/v1/generate"
        />
      </div>
      <div className="flex flex-col w-full md:flex-row lg:px-8">
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
            >
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <Label htmlFor="temperature" className="pl-3 text-left">
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
                        placeholder="Enter a prompt to generate code"
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
        <div className="w-1/2 mt-4 space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center w-full p-8 ml-10 rounded-lg bg-muted">
              <Loader description="Cohere is generating." />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="Cohere is generating your code." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.prompt}
                className={cn(
                  "ml-10 w-full flex items-center text-left gap-x-8 rounded-lg overflow-auto",
                  "dark:bg-zinc-900 border border-black/10",
                  message.generations.length > 1 ? "flex-col" : "flex-row"
                )}
              >
                {message.generations?.map((generation) => (
                  <p key={generation.id} className="text-sm">
                    <ReactMarkdown
                      components={{
                        pre: ({ node, ...props }) => (
                          <div className="w-full p-2 my-2 overflow-auto rounded-lg">
                            <pre {...props} />
                          </div>
                        ),
                        code: ({ node, ...props }) => (
                          <code
                            className="rounded-lg bg-neutral-300 dark:bg-zinc-800"
                            {...props}
                          />
                        ),
                      }}
                      className="overflow-auto text-sm"
                    >
                      {generation.text}
                    </ReactMarkdown>
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
