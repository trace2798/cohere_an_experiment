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
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { hoverModelContent, models } from "./data/models";
import { SelectModel } from "./components/model-select";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

type PromptFormValues = {
  text: string;
  model: string;
};

type TokenizeResponse = {
  tokens: number[];
  token_strings: string[];
};

// const textSchema = z.string().min(2, {
//   message: "Username must be at least 2 characters.",
// });

const TokenizePage = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<TokenizeResponse[]>([]);
  const [characterCount, setCharacterCount] = useState<number>(0);

  const form = useForm<PromptFormValues>({
    // resolver: zodResolver(textSchema),
    defaultValues: {
      text: "",
      model: "command",
    },
  });

  useEffect(() => {
    const text = form.watch("text");
    setCharacterCount(text.length);
  }, [form.watch("text")]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      //   const validatedValues = textSchema.parse(values);
      //   console.log(validatedValues, "VALUES VALUES");
      const response = await axios.post("/api/tokenize", values); // Call the server-side API route
      setMessages((current) => [...current, response.data]);
      toast({
        title: "Success",
        description: "Your input has been tokenized",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error!",
        description: "Request could not be completed.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full p-5 rounded-lg md:p-10">
      <div className="w-full">
        <HeadingApi
          title="Tokenize"
          description="This endpoint splits input text into smaller units called tokens using byte-pair encoding (BPE)."
          method="POST"
          link="https://api.cohere.ai/v1/tokenize"
        />
      </div>
      <div className="flex flex-col w-full md:flex-row lg:px-8">
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
            >
              <div className="flex justify-between">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Label htmlFor="text" className="pl-3 text-left w-fit">
                      text (required)
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
                      options={[
                        "Minimum text length: 1 character",
                        "Minimum text length: 65536 character",
                      ]}
                      functionality="The string to be tokenized"
                      note="N/A"
                    />
                  </HoverCardContent>
                </HoverCard>
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Label htmlFor="text" className="pl-3 text-left w-fit">
                      <span className="text-sm text-gray-500">
                        {characterCount}
                      </span>
                    </Label>
                  </HoverCardTrigger>
                  <HoverCardContent
                    align="start"
                    className="w-[260px] text-sm"
                    side="left"
                  >
                    Number of Characters
                  </HoverCardContent>
                </HoverCard>
              </div>
              <FormField
                name="text"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="pl-3 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent "
                        disabled={isLoading}
                        placeholder="Enter a text to tekenize"
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
              </div>

              <Button
                className="col-span-12 p-5 w-fit lg:col-span-12"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Tokenize
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-1/2 mt-4 space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center w-full p-8 ml-10 rounded-lg bg-muted">
              <Loader description="Cohere is tokenizing your text." />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="Start Tokenizing." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.tokens.length}
                className={cn(
                  "ml-10 p-8 w-full flex flex-col items-start gap-x-8 rounded-lg",
                  "dark:bg-zinc-900 border border-black/10"
                )}
              >
                tokens: [{message.tokens.join(", ")}]
                <br />
                token_strings: [
                {message.token_strings.map((token) => `"${token}"`).join(", ")}]
                Amount of token: {message.token_strings.length}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenizePage;
