export const hoverMaxTokenContent = {
  type: "integer",
  defaultValue: "20",
  options: [
    "Representation models maximum token length: 4096",
    "Generation models maximum token length: 4096",
  ],
  functionality: "Denotes the number of tokens to predict per generation.",
  note: "Can only be set to 0 if return_likelihoods is set to ALL to get the likelihood of the prompt. The easiest way to determine a good number of tokens is to guess and check using this playground.",
};
