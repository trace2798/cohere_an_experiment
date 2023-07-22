import CardContent from "@/components/CardContent";
import Spotlight, { SpotlightCard } from "@/components/spotlight";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
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
    disable: false,
  },
  {
    title: "Detokenize",
    description:
      "This endpoint takes tokens using byte-pair encoding and returns their text representation. ",
    disable: false,
  },
  {
    title: "Detect Language",
    description:
      "This endpoint identifies which language each of the provided texts is written in.",
    disable: false,
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
    disable: false,
  },
  {
    title: "Generate Code",
    description: "Using generate end point to generate code.",
    disable: false,
  },
];

const ExplorePage: FC<ExplorePageProps> = ({}) => {
  return (
    <>
      <h2 className="mt-10 mb-5 text-3xl font-bold md:mt-20 text-primary">
        Available API Endpoints
      </h2>
      <Spotlight className="items-start hidden max-w-sm gap-6 mx-auto lg:grid lg:grid-cols-3 lg:max-w-none group ">
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
      <div className="flex flex-col flex-wrap justify-between md:flex-row w-fit">
        {cardContentData.map((content, index) => (
          <div key={index}>
            <Card className="w-[350px] my-3 flex flex-col lg:hidden">
              <CardHeader>
                <CardTitle>{content.title}</CardTitle>
                <CardDescription>{content.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                {content.disable ? (
                  <div
                    className="inline-flex justify-center items-center whitespace-nowrap cursor-not-allowed rounded-lg bg-slate-800 hover:bg-slate-900 border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
                    aria-disabled="true"
                  >
                    <svg
                      className="mr-2 fill-slate-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="14"
                    >
                      <path d="M12.82 8.116A.5.5 0 0 0 12 8.5V10h-.185a3 3 0 0 1-2.258-1.025l-.4-.457-1.328 1.519.223.255A5 5 0 0 0 11.815 12H12v1.5a.5.5 0 0 0 .82.384l3-2.5a.5.5 0 0 0 0-.768l-3-2.5ZM12.82.116A.5.5 0 0 0 12 .5V2h-.185a5 5 0 0 0-3.763 1.708L3.443 8.975A3 3 0 0 1 1.185 10H1a1 1 0 1 0 0 2h.185a5 5 0 0 0 3.763-1.708l4.609-5.267A3 3 0 0 1 11.815 4H12v1.5a.5.5 0 0 0 .82.384l3-2.5a.5.5 0 0 0 0-.768l-3-2.5ZM1 4h.185a3 3 0 0 1 2.258 1.025l.4.457 1.328-1.52-.223-.254A5 5 0 0 0 1.185 2H1a1 1 0 0 0 0 2Z" />
                    </svg>
                    <span>Currently Working</span>
                  </div>
                ) : (
                  <Link href={content.title.replace(/\s+/g, "").toLowerCase()}>
                    <Button variant="outline">{content.title}</Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExplorePage;
