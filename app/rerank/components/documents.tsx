"use client";
import { HoverContentComponent } from "@/components/HoverContentCompoent";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

interface DocumentsProps {
  documents: (object | string)[];
  setDocuments: React.Dispatch<React.SetStateAction<(object | string)[]>>;
}

type PromptFormValues = {
  query: string;
  model: string;
  documents: (object | string)[];
  top_n: number;
  return_documents: boolean;
};

const Documents: FC<DocumentsProps> = ({ documents, setDocuments }) => {
  const addInputField = () => {
    setDocuments((currentTexts) => [...currentTexts, ""]);
  };

  const form = useForm<PromptFormValues>({
    // resolver: zodResolver(textSchema),
    defaultValues: {
      query: "",
      model: "rerank-english-v2.0",
      documents: [],
    },
  });
  const isLoading = form.formState.isSubmitting;
  return (
    <>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="document" className="pl-3 text-left w-fit">
            documents (required)&nbsp;[type: array]
          </Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          <HoverContentComponent
            type="array"
            defaultValue="REQUIRED"
            options={["N/A"]}
            functionality="A list of document objects or strings to rerank."
            note="The total max chunks (length of documents * max_chunks_per_doc) must be less than 10000. If a document is provided the text fields is required and all other fields will be preserved in the response."
          />
        </HoverCardContent>
      </HoverCard>

      {documents.map((token, index) => (
        <FormField
          key={index}
          name={`documents[${index}]`}
          render={({ field }) => (
            <FormItem className="col-span-12 lg:col-span-10">
              <FormControl className="p-0 m-0">
                <Input
                  className="pl-3 border border-primary-foreground focus-visible:ring-0 focus-visible:ring-transparent "
                  disabled={isLoading}
                  placeholder="Enter information to query the string."
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
        Add Documents
      </Button>
    </>
  );
};

export default Documents;
