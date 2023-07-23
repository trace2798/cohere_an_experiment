import { Model } from "@/typing";

export const hoverEmbedModelContent = {
  type: "string",
  defaultValue: "embed-english-v2.0",
  options: [
    "embed-english-light-v2.0",
    "embed-multilingual-v2.0",
    "embed-english-v2.0",
  ],
  functionality: "The name of the model to classify with.",
  note: "Smaller light models are faster, while larger models will perform better. Custom models can also be supplied with their full ID.",
};
export const models: Model[] = [
  {
    id: "0001",
    name: "embed-english-light-v2.0",
  },
  {
    id: "0002",
    name: "embed-multilingual-v2.0",
  },
  {
    id: "0003",
    name: "embed-english-v2.0",
  },
];

import { Truncate } from "@/typing";

export const hoverEmbedTruncateContent = {
  type: "string",
  defaultValue: "END",
  options: ["NONE", "START", "END"],
  functionality:
    "Passing START will discard the start of the input. END will discard the end of the input. In both cases, input is discarded until the remaining input is exactly the maximum input token length for the model.",
  note: "If NONE is selected, when the input exceeds the maximum input token length an error will be returned.",
};

export const truncate: Truncate[] = [
  {
    id: "0001",
    truncate: "START",
  },
  {
    id: "0002",
    truncate: "END",
  },
  {
    id: "0003",
    truncate: "NONE",
  },
];
