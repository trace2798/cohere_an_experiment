"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { Loader } from "./loader";
import { Empty } from "./ui/empty";
import { cn } from "@/lib/utils";

type PromptFormValues = {
  query: string;
  model: string;
  documents: (object | string)[];
  top_n: number;
  return_documents: boolean;
};

type ReRankDocument = {
  text: string;
};

type ReRankResponse = {
  id: string;
  results: Array<{
    document: ReRankDocument;
    index: number;
    relevance_score: number;
  }>;
  meta: {
    api_version: {
      version: string;
    };
  };
};

export function SearchSheet() {
  const { toast } = useToast();
  const [results, setResults] = useState<ReRankResponse[]>([]);
  const [data, setData] = useState<{
    routes: { route: string; description: string }[];
  }>({ routes: [] });

  const form = useForm<PromptFormValues>({
    // resolver: zodResolver(textSchema),
    defaultValues: {
      query: "",
      model: "rerank-english-v2.0",
      documents: [],
      return_documents: true,
      top_n: 4,
    },
  });

  useEffect(() => {
    // Fetch the data from data.json when the component mounts
    axios.get("/data.json").then((response) => {
      setData(response.data);
    });
  }, []);

  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      const documentsArray = data.routes.map((item) => item.route);

      // Set the documents array in the form values
      values.documents = documentsArray;
      console.log(values, "TOKEN ARRAY");
      const response = await axios.post("/api/search", {
        values, // Use the converted tokens array
      });

      setResults((current) => [...current, response.data]);
      toast({
        title: "Success",
        description: "Your input has been ReRanked.",
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
  const isLoading = form.formState.isSubmitting;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Search</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Search Site</SheetTitle>
          <SheetDescription>Trying to use the ReRank API</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Query
            </Label>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
              >
                {" "}
                <FormField
                  name="query"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="p-0 m-0">
                        <Input
                          className="pl-3 w-full border border-primary-foreground focus-visible:ring-0 focus-visible:ring-transparent "
                          disabled={isLoading}
                          placeholder="Enter the search query"
                          {...field}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="col-span-12 p-5 mt-5 w-fit lg:col-span-12"
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  Search
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <SheetFooter></SheetFooter>
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
                {result.results.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={cn(
                      "md:ml-5 p-2 w-full flex items-start justify-center gap-x-8 rounded-lg",
                      "dark:bg-zinc-900 border border-black/10 my-2"
                    )}
                  >
                    <div className="flex-col text-left">
                      {item.document && (
                        <p className="text-sm">
                          <span className="underline text-indigo-600 ">
                            Document:
                          </span>{" "}
                          <span className="text-base">
                            {" "}
                            {item.document.text}
                          </span>
                        </p>
                      )}
                      <p className="text-sm">
                        <span className="underline text-indigo-500 ">
                          Relevance Score:
                        </span>{" "}
                        <span className="text-base">
                          {item.relevance_score}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="underline text-indigo-400 ">
                          {" "}
                          Index:
                        </span>{" "}
                        <span className="text-base">{item.index}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
