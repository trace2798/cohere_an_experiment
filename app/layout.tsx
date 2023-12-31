import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { SiteFooter } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cohere Playground (Unofficial)",
  description: "Cohere Ai Playground (Unofficial)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <main className="flex flex-col justify-center items-center text-center min-h-screen px-[5vw] pt-10 md:pt-14">
            <Navbar />
            {children}

            <SiteFooter />
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
