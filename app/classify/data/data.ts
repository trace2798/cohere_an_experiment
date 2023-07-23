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
