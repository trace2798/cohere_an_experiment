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
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ExampleField } from "./components/example-field";
import { SelectClassifyModel } from "./components/model-selector";
import { SelectTruncate } from "./components/truncate-selector";
import {
    hoverClassifyExamplesContent,
    hoverClassifyModelContent,
    hoverClassifyTruncateContent,
    models,
    truncate,
} from "./data/data";

type PromptFormValues = {
  inputs: string[];
  model: string;
  truncate: string;
  examples: Array<{ text: string; label: string }>;
};

type ClassifyResponse = {
  id: string;
  classifications: Array<{
    id: string;
    input: string;
    prediction: string;
    confidence: number;
    labels: {
      [label: string]: {
        confidence: number;
      };
    };
  }>;
  meta: {
    api_version: {
      version: string;
    };
  };
};

const ClassifyPage = () => {
  const { toast } = useToast();
  const [results, setResults] = useState<ClassifyResponse[]>([]);
  const [inputs, setInputs] = useState<string[]>([""]);
  const [examples, setExamples] = useState<
    Array<{ text: string; label: string }>
  >([
    { text: "", label: "" },
    { text: "", label: "" },
  ]);

  const form = useForm<PromptFormValues>({
    // resolver: zodResolver(textSchema),
    defaultValues: {
      inputs: [],
      model: "embed-english-v2.0",
      truncate: "END",
      examples: [],
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      console.log(values, "TOKEN ARRAY");
      const response = await axios.post("/api/classify", {
        values, // Use the converted tokens array
      });

      setResults((current) => [...current, response.data]);
      toast({
        title: "Success",
        description: "Your input has been Classified.",
        variant: "default",
      });
      form.reset();
      setInputs([]);
      setExamples([]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error!",
        description: "Request could not be completed.",
        variant: "destructive",
      });
    }
  };

  const addInputField = () => {
    setInputs((currentTexts) => [...currentTexts, ""]);
  };

  const addExampleField = () => {
    setExamples((currentExamples) => [
      ...currentExamples,
      { text: "", label: "" },
      { text: "", label: "" },
    ]);
  };

  return (
    <div className="w-full p-5 rounded-lg md:p-10">
      <div className="w-full">
        <HeadingApi
          title="Classify"
          description="This endpoint makes a prediction about which label fits the specified text inputs best. To make a prediction, Classify uses the provided examples of text + label pairs as a reference."
          method="POST"
          link="https://api.cohere.ai/v1/classify"
          limit="For Trail keys: 100 calls / minute."
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
                  <Label htmlFor="inputs" className="pl-3 text-left w-fit">
                    inputs (required)&nbsp;[type: array of string]
                  </Label>
                </HoverCardTrigger>
                <HoverCardContent
                  align="start"
                  className="w-[260px] text-sm"
                  side="left"
                >
                  <HoverContentComponent
                    type="array of strings"
                    defaultValue="REQUIRED"
                    options={["Minimum: 1", "Maximum: 96"]}
                    functionality="Represents a list of queries to be classified,"
                    note="N/A"
                  />
                </HoverCardContent>
              </HoverCard>
              {inputs.map((input, index) => (
                <FormField
                  key={index}
                  name={`inputs[${index}]`}
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="p-0 m-0">
                        <Input
                          className="pl-3 border border-primary-foreground focus-visible:ring-0 focus-visible:ring-transparent "
                          disabled={isLoading}
                          placeholder="Enter text to classify"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                className="col-span-12 p-5 mt-5 w-fit lg:col-span-12"
                type="button"
                onClick={addInputField}
                size="icon"
                variant="ghost"
              >
                Add text fields <PlusCircleIcon className="w-5 ml-5 " />
              </Button>
              <ExampleField
                examples={examples}
                isLoading={isLoading}
                addExampleField={addExampleField}
                hoverContentProps={hoverClassifyExamplesContent}
              />

              <Heading
                title="Available option"
                description="All set to default. Change to experiment."
              />
              <div className="grid w-full p-2 -mt-10 overflow-hidden xl:gap-2 2xl:grid-cols-2">
                <SelectClassifyModel
                  models={models}
                  hoverContentProps={hoverClassifyModelContent}
                  setValue={form.setValue}
                />
                <SelectTruncate
                  truncate={truncate}
                  setValue={form.setValue}
                  hoverContentProps={hoverClassifyTruncateContent}
                />
              </div>
              <div className="flex flex-col justify-between xl:justify-around md:flex-row">
                <Button
                  className="col-span-12 p-5 mt-5 w-fit lg:col-span-12"
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  Classify
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="w-1/2 space-y-4 md:mt-0">
          {isLoading && (
            <div className="flex items-center justify-center w-full p-3 ml-5 rounded-lg w-fill bg-muted">
              <Loader description="Cohere is tokenizing your text." />
            </div>
          )}
          {results.length === 0 && !isLoading && (
            <Empty label="Start Detecting Language." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {results.map((result, resultIndex) => (
              <div
                key={resultIndex}
                className={cn(
                  "ml-5 p-2 w-fill flex flex-col items-center gap-x-8 rounded-lg",
                  "dark:bg-zinc-900 border border-black/10"
                )}
              >
                {result.classifications.map(
                  (classification, classificationIndex) => (
                    <div
                      key={classificationIndex}
                      className={cn(
                        "md:ml-5 p-2 w-full flex items-start justify-center gap-x-8 rounded-lg",
                        "dark:bg-zinc-900 border border-black/10 my-2"
                      )}
                    >
                      <div className="flex-col text-left">
                        <p className="text-sm">
                          <span className="text-indigo-600 underline ">
                            Input:
                          </span>{" "}
                          <span className="text-base">
                            {" "}
                            {classification.input}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="text-indigo-500 underline ">
                            Prediction:
                          </span>{" "}
                          <span className="text-base">
                            {classification.prediction}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="text-indigo-400 underline ">
                            Confidence:
                          </span>{" "}
                          <span className="text-base">
                            {classification.confidence}
                          </span>
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassifyPage;
