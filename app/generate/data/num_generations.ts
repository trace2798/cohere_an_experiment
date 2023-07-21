import { Generations } from "@/typing";

export const hoverNumGenerationContent = {
  type: "integer",
  defaultValue: "1",
  options: ["1", "2", "3", "4", "5"],
  functionality:
    "Denotes the maximum number of generations that will be returned.",
  note: "N/A",
};

export const num_generations: Generations[] = [
  {
    id: "0001",
    numberOfGenerations: 1,
  },
  {
    id: "0002",
    numberOfGenerations: 2,
  },
  {
    id: "0003",
    numberOfGenerations: 3,
  },
  {
    id: "0004",
    numberOfGenerations: 4,
  },
  {
    id: "0005",
    numberOfGenerations: 5,
  },
];
