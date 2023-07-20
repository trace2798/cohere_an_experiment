"use client";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
      const response = await axios.post("/api/summarize", values);
      setSummaries((current) => [...current, response.data]);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-10 rounded-lg">
      <div className="flex">
        <div>
          <Heading
            title="Summarize"
            description="Summarize using cohere."
          
            bgColor="bg-violet-500/10"
          />
          text

Type: string
Required: true
Description: The text to generate a summary for. Can be up to 100,000 characters long. Currently, the only supported language is English.
length

Type: string
Default: "medium"
Available values: "short", "medium", "long", "auto"
Description: Indicates the approximate length of the summary. If "auto" is selected, the best option will be picked based on the input text.
format

Type: string
Default: "paragraph"
Available values: "paragraph", "bullets", "auto"
Description: Indicates the style in which the summary will be delivered - in a free-form paragraph or in bullet points. If "auto" is selected, the best option will be picked based on the input text.
model

Type: string
Default: "summarize-xlarge"
Available values: "summarize-medium", "summarize-xlarge"
Description: The ID of the model to generate the summary with. Currently available models are "summarize-medium" and "summarize-xlarge" (default). Smaller models are faster, while larger models will perform better.
extractiveness

Type: string
Default: "low"
Available values: "low", "medium", "high", "auto"
Description: Controls how close to the original text the summary is. "High extractiveness" summaries will lean towards reusing sentences verbatim, while "low extractiveness" summaries will tend to paraphrase more. If "auto" is selected, the best option will be picked based on the input text.
temperature

Type: number
Range: 0 to 5
Description: Controls the randomness of the output. Lower values tend to generate more “predictable” output, while higher values tend to generate more “creative” output. The sweet spot is typically between 0 and 1.
additional_command

Type: string
Description: A free-form instruction for modifying how the summaries get generated. Should complete the sentence "Generate a summary _". E.g., "focusing on the next steps" or "written by Yoda".
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
