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
import { SelectTruncate } from "./components/truncate-selector";
import {
  hoverEmbedModelContent,
  hoverEmbedTruncateContent,
  models,
  truncate,
} from "./data/data";
import { SelectEmbedModel } from "./components/model-selector";

type PromptFormValues = {
  texts: string[];
  model: string;
  truncate: string;
};

type DetectLanguageResponse = {
  results: {
    language_name: string;
    language_code: string;
  }[];
};

const EmbedPage = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<DetectLanguageResponse[]>([]);
  const [texts, setTexts] = useState<string[]>([""]);

  const form = useForm<PromptFormValues>({
    // resolver: zodResolver(textSchema),
    defaultValues: {
      texts: [],
      model: "embed-english-v2.0",
      truncate: "END",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      const response = await axios.post("/api/detect-language", values); // Call the server-side API route
      setMessages((current) => [...current, response.data]);
      toast({
        title: "Success",
        description: "Your input has been detected.",
        variant: "default",
      });
      form.reset();
      setTexts([]);
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
    setTexts((currentTexts) => [...currentTexts, ""]);
  };
  return (
    <div className="w-full p-5 rounded-lg md:p-10">
      <div className="w-full">
        <HeadingApi
          title="Embed"
          description="This endpoint returns text embeddings. An embedding is a list of floating point numbers that captures semantic information about the text that it represents."
          method="POST"
          link="https://api.cohere.ai/v1/embed"
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
                  <Label htmlFor="text" className="pl-3 text-left w-fit">
                    texts (required)
                  </Label>
                </HoverCardTrigger>
                <HoverCardContent
                  align="start"
                  className="w-[260px] text-sm"
                  side="left"
                >
                  <HoverContentComponent
                    type="texts array of strings"
                    defaultValue="REQUIRED"
                    options={["Maximum number of texts per call is 96"]}
                    functionality="An array of strings for the model to embed."
                    note="It is recommended to reduce the length of each text to be under 512 tokens for optimal quality."
                  />
                </HoverCardContent>
              </HoverCard>

              {/* <FormField
                name="text"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="pl-3 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent "
                        disabled={isLoading}
                        placeholder="Enter a text to tokenize"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}
              {texts.map((text, index) => (
                <FormField
                  key={index}
                  name={`texts[${index}]`}
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="p-0 m-0">
                        <Input
                          className="pl-3 border border-primary-foreground focus-visible:ring-0 focus-visible:ring-transparent "
                          disabled={isLoading}
                          placeholder="Enter text to detect language"
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
              <Heading
                title="Available option"
                description="All set to default. Change to experiment."
              />
              <div className="grid w-full p-2 -mt-10 overflow-hidden xl:gap-2 2xl:grid-cols-2">
                <SelectEmbedModel
                  models={models}
                  hoverContentProps={hoverEmbedModelContent}
                  setValue={form.setValue}
                />
                <SelectTruncate
                  truncate={truncate}
                  setValue={form.setValue}
                  hoverContentProps={hoverEmbedTruncateContent}
                />
              </div>
              <div className="flex flex-col justify-between xl:justify-around md:flex-row">
                <Button
                  className="col-span-12 p-5 mt-5 w-fit lg:col-span-12"
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  Embed
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="w-1/2 space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center w-full p-3 ml-5 rounded-lg w-fill bg-muted">
              <Loader description="Cohere is tokenizing your text." />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="Start Detecting Language." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, messageIndex) => (
              <div
                key={messageIndex}
                className={cn(
                  "ml-10 p-8 w-full flex flex-col items-center gap-x-8 rounded-lg",
                  "dark:bg-zinc-900 border border-black/10"
                )}
              >
                {message.results.map((result, resultIndex) => (
                  <div key={resultIndex}>
                    <strong>Detected Language:</strong>{" "}
                    {result.language_name || "Unknown"}
                    <br />
                    <strong>Language Code:</strong>{" "}
                    {result.language_code || "Unknown"}
                    <br />
                    <br />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedPage;
