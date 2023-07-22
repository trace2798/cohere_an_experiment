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
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { hoverModelContent, models } from "./components/model";
import { SelectModel } from "./components/model-selector";

type PromptFormValues = {
  query: string;
  model: string;
  documents: (object | string)[];
  top_n: number;
  return_documents: boolean;
};

type DetokenizeResponse = {
  text: string;
};

const ReRankPage = () => {
  const { toast } = useToast();
  const [text, setText] = useState<DetokenizeResponse[]>([]);
  const [tokens, setTokens] = useState<number[]>([]);

  const form = useForm<PromptFormValues>({
    // resolver: zodResolver(textSchema),
    defaultValues: {
      query: "",
      model: "command",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      console.log(values, "TOKEN ARRAY");
      const response = await axios.post("/api/rerank", {
        values, // Use the converted tokens array
      });

      setText((current) => [...current, response.data]);
      toast({
        title: "Success",
        description: "Your input has been de-tokened.",
        variant: "default",
      });
      form.reset();
      setTokens([]);
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
    setTokens((currentTexts) => [...currentTexts, 0]);
  };
  return (
    <div className="w-full p-5 rounded-lg md:p-10">
      <div className="w-full">
        <HeadingApi
          title="Rerank"
          description="This endpoint takes in a query and a list of texts and produces an ordered array with each text assigned a relevance score."
          method="POST"
          link="https://api.cohere.ai/v1/rerank"
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
                  <Label htmlFor="text" className="pl-3 text-left w-fit">
                    query (required)&nbsp;[type: string]
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
                    functionality="The search query."
                    note="N/A"
                  />
                </HoverCardContent>
              </HoverCard>
              {tokens.map((token, index) => (
                <FormField
                  key={index}
                  name={`tokens[${index}]`}
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="p-0 m-0">
                        <Input
                          type="number"
                          pattern="^[1-9]\d*$"
                          className="pl-3 border border-primary-foreground focus-visible:ring-0 focus-visible:ring-transparent "
                          disabled={isLoading}
                          placeholder="Enter token to to be detokenized"
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
                Add token
              </Button>
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
              <div className="flex flex-col justify-between xl:justify-around md:flex-row">
                <Button
                  className="col-span-12 p-5 mt-5 w-fit lg:col-span-12"
                  type="submit"
                  disabled={isLoading || tokens.length < 1}
                  size="icon"
                >
                  DeTokenize
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
          {text.length === 0 && !isLoading && (
            <Empty label="Start Detecting Language." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {text.map((t, tIndex) => (
              <div
                key={tIndex}
                className={cn(
                  "ml-5 p-2 w-fill flex flex-col items-center gap-x-8 rounded-lg",
                  "dark:bg-zinc-900 border border-black/10"
                )}
              >
                <div
                  key={tIndex} // Use tIndex or another unique identifier as the key
                  className={cn(
                    "md:ml-5 p-2 w-full flex items-start justify-center gap-x-8 rounded-lg",
                    "dark:bg-zinc-900 border border-black/10"
                  )}
                >
                  <p className="text-base">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReRankPage;
