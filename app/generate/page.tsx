"use client";

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import cohere from "cohere-ai";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type PromptFormValues = {
  prompt: string;
};

type Generation = {
  id: string;
  text: string;
  index: number;
  likelihood: number;
};

type CohereApiResponse = {
  prompt: string;
  generations: Generation[];
  // Define the response structure based on Cohere's API response
  // Adjust the types according to the actual response structure from the API
  // For example: data: string or data: { message: string }
};

const GeneratePage: React.FC = () => {
  const [messages, setMessages] = useState<CohereApiResponse[]>([]);

  const form = useForm<PromptFormValues>({
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  // const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
  //   try {
  //     const options = {
  //       method: "POST",
  //       url: "https://api.cohere.ai/v1/generate",
  //       headers: {
  //         accept: "application/json",
  //         "content-type": "application/json",
  //         authorization: process.env.NEXT_PUBLIC_COHERE_API_KEY,
  //       },
  //       data: { prompt: values.prompt, num_generations: 1, max_tokens: 1000 },
  //     };
  //     console.log(process.env.NEXT_PUBLIC_COHERE_API_KEY);
  //     const response = await axios.request<CohereApiResponse>(options);
  //     setMessages((current) => [...current, response.data]);

  //     form.reset();
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong.");
  //   }
  // };
  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      console.log(values, "VALUES VALUES")
      const response = await axios.post('/api/generate', values); // Call the server-side API route
      setMessages((current) => [...current, response.data]);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    }
  };
  return (
    <div className="p-10 rounded-lg">
      <div className="flex">
        <Heading
          title="Generate"
          description="Generate using cohere."
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
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="p-0 m-0">
                        <Input
                          className="pl-3 text-white border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent bg-slate-900"
                          disabled={isLoading}
                          placeholder="Enter a prompt to generate answer?"
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
                  Generate
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
            {messages.length === 0 && !isLoading && (
              <Empty label="No conversation started." />
            )}
            <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message) => (
                <div
                  key={message.prompt}
                  className={cn(
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                    message.prompt === "user"
                      ? "bg-slate-700 border border-black/10"
                      : "bg-muted"
                  )}
                >
                  {message.generations?.map((generation) => (
                    <p key={generation.id} className="text-sm">
                      {generation.text}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
