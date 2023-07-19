import Spotlight, { SpotlightCard } from "@/components/spotlight";
import { Heading } from "@/components/ui/heading";
import Image from "next/image";
import { FC } from "react";

interface GeneratePageProps {}

const GeneratePage: FC<GeneratePageProps> = ({}) => {
  return (
    <>
      <div className="">
        <Heading title="Generate" description=""/>
      </div>
    </>
  );
};

export default GeneratePage;
