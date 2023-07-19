import CardContent from "@/components/CardContent";
import Spotlight, { SpotlightCard } from "@/components/spotlight";
import { FC } from "react";

interface ExplorePageProps {}

const cardContentData = [
  {
    title: "Generate",
    description:
      "This endpoint generates realistic text conditioned on a given input.",
  },
  {
    title: "Embed",
    description:
      "This endpoint returns text embeddings. An embedding is a list of floating point numbers that captures semantic information about the text that it represents.",
  },
  {
    title: "Classify",
    description:
      "This endpoint makes a prediction about which label fits the specified text inputs best.",
  },
  {
    title: "Tokenize",
    description:
      "This endpoint splits input text into smaller units called tokens using byte-pair encoding (BPE).",
  },
  {
    title: "Detokenize",
    description:
      "This endpoint takes tokens using byte-pair encoding and returns their text representation. ",
  },
  {
    title: "Detect Language",
    description:
      "This endpoint identifies which language each of the provided texts is written in.",
  },
  {
    title: "Summarize",
    description:
      "This endpoint generates a summary in English for a given text.",
  },
  {
    title: "Rerank",
    description:
      "This endpoint takes in a query and a list of texts and produces an ordered array with each text assigned a relevance score.",
  },
];

const ExplorePage: FC<ExplorePageProps> = ({}) => {
  return (
    <>
      <main className="flex flex-col justify-center items-center text-center min-h-screen bg-slate-800 p-24">
        <h2 className="text-3xl text-neutral-200 mb-10 font-bold">
          Available API Endpoints
        </h2>
        <Spotlight className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none group">
          {cardContentData.map((content, index) => (
            <SpotlightCard key={index}>
              <CardContent
                title={content.title}
                description={content.description}
              />
            </SpotlightCard>
          ))}
        </Spotlight>
      </main>
    </>
  );
};

export default ExplorePage;
