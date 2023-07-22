"use client";
import { HoverContentComponent } from "@/components/HoverContentCompoent";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type PromptFormValues = {
  texts: string[];
};

type DetectLanguageResponse = {
  results: {
    language_name: string; // Name of the detected language
    language_code: string; // Code representing the detected language
  }[];
};

const DetectLanguagePage = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<DetectLanguageResponse[]>([]);
  const [texts, setTexts] = useState<string[]>([""]);

  const form = useForm<PromptFormValues>({
    // resolver: zodResolver(textSchema),
    defaultValues: {
      texts: [],
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
          title="Detect Language"
          description="This endpoint identifies which language each of the provided texts is written in."
          method="POST"
          link="https://api.cohere.ai/v1/detect-language"
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
                    options={["N/A"]}
                    functionality="List of strings to run the detection on."
                    note="N/A"
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
              <div className="flex flex-col justify-between xl:justify-around md:flex-row">
                <Button
                  className="col-span-12 p-5 mt-5 w-fit lg:col-span-12"
                  type="button"
                  onClick={addInputField}
                  size="icon"
                  variant="ghost"
                >
                  Add text fields
                </Button>

                <Button
                  className="col-span-12 p-5 mt-5 w-fit lg:col-span-12"
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  Detect Language
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

export default DetectLanguagePage;
