import { Model } from "@/typing";

export const hoverModelContent = {
  type: "string",
  defaultValue: "command",
  options: [
    "command",
    "command-nightly(experimental)",
    "command-light",
    "command-light-nightly(experimental)",
  ],
  functionality:
    "The name of the model to generate with. Smaller, light models are faster, while larger models will perform better.",
  note: "Custom models can also be supplied with their full ID.",
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
];
