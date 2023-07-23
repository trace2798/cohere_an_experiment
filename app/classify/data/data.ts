export const hoverClassifyInputContent = {
  type: "array of strings",
  defaultValue: "REQUIRED",
  options: ["Minimum: 1", "Maximum: 96"],
  functionality: "Represents a list of queries to be classified,",
  note: "N/A",
};

export const hoverClassifyExamplesContent = {
  type: "array of objects",
  defaultValue: "REQUIRED",
  options: [
    "Minimum of 2 examples associated with each unique label",
    "Maximum number of examples: 2500",
    "Maximum length of each examples 512 tokens.",
  ],
  functionality:
    "Each example is a text string and its associated label/class. An array of examples to provide context to the model.",
  note: "Each unique label requires at least 2 examples associated with it.  Custom Models trained on classification examples don't require the examples parameter to be passed in explicitly.",
};

import { Model } from "@/typing";

export const hoverClassifyModelContent = {
  type: "string",
  defaultValue: "embed-english-v2.0",
  options: [
    "embed-multilingual-v2.0",
    "embed-english-light-v2.0",
    "embed-english-v2.0",
  ],
  functionality: "The name of the model to classify with.",
  note: "Smaller light models are faster, while larger models will perform better. Custom models can also be supplied with their full ID.",
};

export const models: Model[] = [
  {
    id: "0001",
    name: "embed-multilingual-v2.0",
  },
  {
    id: "0002",
    name: "embed-english-light-v2.0",
  },
  {
    id: "0003",
    name: "embed-english-v2.0",
  },
];
