import { Model } from "@/typing";

export const hoverModelContent = {
  type: "string",
  defaultValue: "command",
  options: [
    "command",
    "command-nightly(experimental)",
    "command-light",
    "command-light-nightly(experimental)",
    "summarize-xlarge",
    "summarize-medium",
  ],
  functionality:
    "The name of the model to detokenize with. This will ensure that the detokenization is done by the tokenizer used by that model.",
  note: "An optional parameter to provide the model name",
};

export const models: Model[] = [
  {
    id: "0001",
    name: "command",
  },
  {
    id: "0002",
    name: "command-nightly",
  },
  {
    id: "0003",
    name: "command-light",
  },
  {
    id: "0004",
    name: "command-light-nightly",
  },
  {
    id: "0005",
    name: "summarize-xlarge",
  },
  {
    id: "0006",
    name: "summarize-medium",
  },
];
