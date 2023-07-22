export const hoverReturnDocumentContent = {
  type: "boolean",
  defaultValue: "false",
  options: [
    "true:  the api will return an ordered list of {index, text, relevance score} where index + text refers to the list passed into the request.",
    "false: the api will return a list of {index, relevance score} where index is inferred from the list passed into the request.",
  ],
  functionality: "Return results with or without the doc text.",
  note: "N/A",
};
