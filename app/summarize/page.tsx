"use client";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SelectLength } from "./component/SelectLength";
import { SelectFormat } from "./component/selectFormat";
import { SelectModel } from "./component/selectModal";
import { SelectExtractiveness } from "./component/selectExtractiveness";
import { TemperatureSlider } from "./component/temperatureSlider";

// Define types for data and API response
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

const SummarizePage: React.FC = () => {
  const [summaries, setSummaries] = useState<CohereApiResponse[]>([]);

  const form = useForm<PromptFormValues>({
    defaultValues: {
      text: "",
      length: "medium",
      format: "paragraph",
      model: "summarize-xlarge",
      extractiveness: "low",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      const requestData = { ...values };
      const response = await axios.post("/api/summarize", requestData);
      setSummaries((current) => [...current, response.data]);
      form.setValue("text", "");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full p-5 rounded-lg md:p-10">
      <div className="w-1/3">
        <Heading title="Summarize" description="Summarize using cohere." />
      </div>

      <div className="flex flex-col w-full md:flex-row lg:px-8">
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
            >
              <FormField
                name="text"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Textarea
                        className="pl-3 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
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
                description="All set to default. Change to Playaround"
              />
              {/* <div className="flex flex-col flex-wrap justify-between w-full col-span-12 lg:col-span-2">
                <SelectLength setValue={form.setValue} />
                <SelectFormat setValue={form.setValue} />
                <SelectModel setValue={form.setValue} />
                <SelectExtractiveness setValue={form.setValue} />
              </div> */}
              <div className="grid w-full p-2 overflow-hidden xl:gap-2 2xl:grid-cols-2">
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
            <div className="flex items-center justify-center w-full p-8 rounded-lg bg-muted">
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
