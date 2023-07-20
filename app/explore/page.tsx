import CardContent from "@/components/CardContent";
import Spotlight, { SpotlightCard } from "@/components/spotlight";
import { FC } from "react";

interface ExplorePageProps {}

const cardContentData = [
  {
    title: "Generate",
    description:
      "This endpoint generates realistic text conditioned on a given input.",
    disable: false,
  },
  {
    title: "Embed",
    description:
      "This endpoint returns text embeddings. An embedding is a list of floating point numbers that captures semantic information about the text that it represents.",
    disable: true,
  },
  {
    title: "Classify",
    description:
      "This endpoint makes a prediction about which label fits the specified text inputs best.",
    disable: true,
  },
  {
    title: "Tokenize",
    description:
      "This endpoint splits input text into smaller units called tokens using byte-pair encoding (BPE).",
    disable: true,
  },
  {
    title: "Detokenize",
    description:
      "This endpoint takes tokens using byte-pair encoding and returns their text representation. ",
    disable: true,
  },
  {
    title: "Detect Language",
    description:
      "This endpoint identifies which language each of the provided texts is written in.",
    disable: true,
  },
  {
    title: "Summarize",
    description:
      "This endpoint generates a summary in English for a given text.",
    disable: false,
  },
  {
    title: "Rerank",
    description:
      "This endpoint takes in a query and a list of texts and produces an ordered array with each text assigned a relevance score.",
    disable: true,
  },
];

const ExplorePage: FC<ExplorePageProps> = ({}) => {
  return (
    <>
      <h2 className="mb-10 text-3xl font-bold text-neutral-200">
        Available API Endpoints
      </h2>
      <Spotlight className="grid items-start max-w-sm gap-6 mx-auto lg:grid-cols-3 lg:max-w-none group">
        {cardContentData.map((content, index) => (
          <SpotlightCard key={index}>
            <CardContent
              title={content.title}
              description={content.description}
              disable={content.disable}
            />
          </SpotlightCard>
        ))}
      </Spotlight>
    </>
  );
};

export default ExplorePage;
