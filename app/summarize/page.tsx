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

// Define types for data and API response
type PromptFormValues = {
  text: string;
  length: string;
  format: string;
  model: string;
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
    <div className="p-10 rounded-lg bg-neutral-200">
      <div className="flex">
        <div className="w-1/3">
          <Heading title="Summarize" description="Summarize using cohere." />
        </div>
        <div className="px-4 lg:px-8">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
              >
                <FormField
                  name="text"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="p-0 m-0">
                        <Textarea
                          className="pl-3 text-white border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent bg-slate-900"
                          disabled={isLoading}
                          placeholder="Enter text to summarize"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full col-span-12 p-5 lg:col-span-2"
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  Summarize
                </Button>
              </form>
              <div className="flex flex-wrap justify-between w-full">
                <Heading
                  title="Available option"
                  description="All set the default. Change to Playaround"
                />
                <SelectLength setValue={form.setValue} />
                <SelectFormat setValue={form.setValue} />
                <SelectModel setValue={form.setValue} />
              </div>
            </Form>
          </div>
          <div className="mt-4 space-y-4">
            {isLoading && (
              <div className="flex items-center justify-center w-full p-8 rounded-lg bg-muted">
                <Loader description="Cohere is summarizing your input" />
              </div>
            )}
            {summaries.length === 0 && !isLoading && (
              <Empty label="No summaries available." />
            )}
            <div className="flex flex-col-reverse gap-y-4">
              <p className="text-sm">Input:</p>
              {summaries.map((summary) => (
                <div
                  key={summary.id}
                  className={cn(
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                    "bg-neutral-200 border border-black/10"
                  )}
                >
                  <p className="text-base">{summary.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizePage;

// data: { message: 'invalid request: text must be longer than 250 characters'}
