import { Model } from "@/typing";

export const hoverModelContent = {
  type: "string",
  defaultValue: "rerank-english-v2.0",
  options: ["rerank-english-v2.0", "rerank-multilingual-v2.0"],
  functionality:
    "The name of the model to use.",
  note: "Currently there are only 2 available model.",
};

export const models: Model[] = [
  {
    id: "0001",
    name: "rerank-english-v2.0",
  },
  {
    id: "0002",
    name: "rerank-multilingual-v2.0",
  },
];
