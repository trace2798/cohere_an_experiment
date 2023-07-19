import CardContent from "@/components/CardContent";
import Spotlight, { SpotlightCard } from "@/components/spotlight";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center text-center min-h-screen bg-black">
      <h1 className="text-8xl font-bold text-neutral-200">
        An Experiment with Cohere Ai
      </h1>
      <h2 className="text-3xl text-slate-500 mt-5">
        Trying to implement all the api endpoints offered by Cohere with Next.Js
      </h2>
    </main>
  );
}
