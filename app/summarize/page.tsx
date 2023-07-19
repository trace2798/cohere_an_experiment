"use client";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// Define types for data and API response
type PromptFormValues = {
  text: string;
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
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      const options = {
        method: "POST",
        url: "https://api.cohere.ai/v1/summarize",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: "Bearer 60yNtHt2Xm0VDN3thaPul731hq0O17MI2y5PIEtR",
        },
        data: {
          text: values.text,
        },
      };

      const response = await axios.request<CohereApiResponse>(options);
      setSummaries((current) => [...current, response.data]);

      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="p-10 rounded-lg">
      <div className="flex">
        <Heading
          title="Summarize"
          description="Summarize using cohere."
          icon={MessageSquare}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />
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
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent bg-slate-900 text-white pl-3"
                          disabled={isLoading}
                          placeholder="Enter text to summarize"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full col-span-12 lg:col-span-2 p-5"
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  Summarize
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4 space-y-4">
            {isLoading && (
              <div className="flex items-center justify-center w-full p-8 rounded-lg bg-muted">
                <Loader />
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
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                    "bg-neutral-200 border border-black/10"
                  )}
                >
                  <p className="text-sm">{summary.summary}</p>
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
