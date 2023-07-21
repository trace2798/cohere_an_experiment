import CardContent from "@/components/CardContent";
import Spotlight, { SpotlightCard } from "@/components/spotlight";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="font-bold text-8xl text-primary">
        An Experiment with{" "}
        <span className="text-transparent bg-gradient-to-r bg-clip-text from-yellow-500 via-purple-500 to-red-500 animate-text">
          Cohere Ai
        </span>
      </h1>
      <h2 className="mt-5 text-3xl text-slate-500">
        Trying to implement all the api endpoints offered by Cohere with Next.Js
      </h2>
      <Link href="/explore">
        <Button className="mt-5">Explore</Button>
      </Link>
    </>
  );
}
