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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SelectLength } from "./component/SelectLength";
import { SelectExtractiveness } from "./component/selectExtractiveness";
import { SelectFormat } from "./component/selectFormat";
import { SelectModel } from "./component/selectModal";
import { TemperatureSlider } from "./component/temperatureSlider";
import * as z from "zod";

const promptFormValuesSchema = z.object({
  text: z.string().min(250, "Text must be at least 250 characters long"),
  length: z.string(),
  format: z.string(),
  model: z.string(),
  extractiveness: z.string(),
  temperature: z.number(),
});

type PromptFormValues = {
  text: string;
  length: string;
  format: string;
  model: string;
  extractiveness: string;
  temperature: number;
};

type CohereApiResponse = {
  id: string;
  summary: string;
  meta: {
    api_version: {
      version: string;
    };
  };
};

const SummarizePage = () => {
  const { toast } = useToast();
  const [summaries, setSummaries] = useState<CohereApiResponse[]>([]);

  const form = useForm<PromptFormValues>({
    defaultValues: {
      text: "",
      length: "medium",
      format: "paragraph",
      model: "summarize-xlarge",
      extractiveness: "low",
      temperature: 0.5,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      // Validating the form data with zod
      const validFormData = promptFormValuesSchema.parse(values);
      const requestData = { ...validFormData };
      const response = await axios.post("/api/summarize", requestData);
      setSummaries((current) => [...current, response.data]);
      toast({
        title: "Success!",
        description: "Text Successfully Summarized",
        variant: "default",
      });
      form.setValue("text", "");
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handling Zod validation errors
        toast({
          title: "Validation Error!",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        // Error not related to Zod
        console.error(error);
        toast({
          title: "Error!",
          description: "Request could not be completed.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="w-full p-5 rounded-lg md:p-10">
      <div className="w-full">
        <HeadingApi
          title="Summarize"
          description="This endpoint generates a summary in English for a given text."
          method="POST"
          link="https://api.cohere.ai/v1/summarize"
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
                    Text (required)
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
                    functionality="The text to generate a summary for."
                    note="Can be up to 100,000 characters long. Currently the only supported language is English."
                  />
                </HoverCardContent>
              </HoverCard>
              <FormField
                name="text"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Textarea
                        className="pt-3 pl-3 border focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Enter text to summarize"
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
              {/* <div className="flex flex-col flex-wrap justify-between w-full col-span-12 lg:col-span-2">
                <SelectLength setValue={form.setValue} />
                <SelectFormat setValue={form.setValue} />
                <SelectModel setValue={form.setValue} />
                <SelectExtractiveness setValue={form.setValue} />
              </div> */}
              <div className="grid w-full p-2 -mt-10 overflow-hidden xl:gap-2 2xl:grid-cols-2">
                <SelectLength setValue={form.setValue} />
                <SelectFormat setValue={form.setValue} />
                <SelectModel setValue={form.setValue} />
                <SelectExtractiveness setValue={form.setValue} />
              </div>
              <TemperatureSlider setValue={form.setValue} />
              <Button
                className="col-span-12 p-5 w-fit lg:col-span-12"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Summarize
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-1/2 mt-4 space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center w-full p-8 ml-10 rounded-lg bg-muted">
              <Loader description="Cohere is summarizing your input" />
            </div>
          )}
          {summaries.length === 0 && !isLoading && (
            <Empty label="No summaries available." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {summaries.map((summary) => (
              <div
                key={summary.id}
                className={cn(
                  "ml-10 p-8 w-full flex items-start gap-x-8 rounded-lg",
                  "dark:bg-zinc-900 border border-black/10"
                )}
              >
                <p className="text-base">{summary.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizePage;

// data: { message: 'invalid request: text must be longer than 250 characters'}
//   temperature: undefined
