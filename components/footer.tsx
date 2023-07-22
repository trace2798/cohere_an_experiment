import * as React from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import Image from "next/image";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="fixed bottom-0 inset-x-0 h-fit dark:bg-inherit z-[10] py-2">
        <div className="container flex flex-col items-center justify-between h-fit">
          {/* logo */}

          <p className="text-sm leading-loose text-center md:text-left">
            Built by{" "}
            <a
              href="https://www.github.com/trace2798"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Trace
            </a>
            . Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . Illustrations by{" "}
            <a
              href="https://undraw.co"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Undraw
            </a>
          </p>
          <div className="text-xs">
            This is an unofficial Playground for Cohere. I neither work for
            Cohere neither I am affiliated with the company. I was just having
            some problem with their official playground so I created this one.
          </div>
        </div>
      </div>
    </footer>
  );
}
