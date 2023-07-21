import { Truncate } from "@/typing";

export const hoverTruncateContent = {
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
