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
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Documents from "./components/documents";
import { hoverModelContent, models } from "./data/model";
import { SelectModel } from "./components/model-selector";
// import { SelectReturnDocument } from "./components/return-document-selector";
import { ReturnDocument } from "./components/return-document-selector";
import { hoverReturnDocumentContent } from "./data/return_document";
import TopReturn from "./components/top-return";
import { hoverTopNContent } from "./data/top_n";

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

const ReRankPage = () => {
  const { toast } = useToast();
  const [results, setResults] = useState<ReRankResponse[]>([]);
  const [documents, setDocuments] = useState<(object | string)[]>([]);

  const form = useForm<PromptFormValues>({
    // resolver: zodResolver(textSchema),
    defaultValues: {
      query: "",
      model: "rerank-english-v2.0",
      documents: [],
      return_documents: false,
      top_n: 1,
    },
  });

  useEffect(() => {
    form.setValue("top_n", documents.length);
  }, [documents, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<PromptFormValues> = async (values) => {
    try {
      console.log(values, "TOKEN ARRAY");
      const response = await axios.post("/api/rerank", {
        values, // Use the converted tokens array
      });

      setResults((current) => [...current, response.data]);
      toast({
        title: "Success",
        description: "Your input has been ReRanked.",
        variant: "default",
      });
      form.reset();
      setDocuments([]);
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
                  <Label htmlFor="query" className="pl-3 text-left w-fit">
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
              <FormField
                name="query"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="pl-3 border border-primary-foreground focus-visible:ring-0 focus-visible:ring-transparent "
                        disabled={isLoading}
                        placeholder="Enter the search query"
                        {...field}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Documents documents={documents} setDocuments={setDocuments} />
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
                <ReturnDocument
                  returnDocuments={form.watch("return_documents")}
                  setValue={form.setValue}
                  hoverContentProps={hoverReturnDocumentContent}
                />
                <TopReturn
                  hoverContentProps={hoverTopNContent}
                  setValue={form.setValue}
                  top_n={form.watch("top_n")}
                />
              </div>
              <div className="flex flex-col justify-between xl:justify-around md:flex-row">
                <Button
                  className="col-span-12 p-5 mt-5 w-fit lg:col-span-12"
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  ReRank
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
      </div>
    </div>
  );
};

export default ReRankPage;
