// use client
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Cutive_Mono } from "next/font/google";
const roboto = Cutive_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Typewriter = ({ text }: { text: string }) => {
  // Create a typescript component which has the functionality of a typewriter
  // and each letter should be typed out one by one with a small delay
  // once the word is typed out, the cursor should disappear

  const [word, setWord] = useState("");
  const [index, setIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setWord((prevWord) => prevWord + text[index]);
        setIndex((prevIndex) => prevIndex + 1);

        // this removes the cursor which is added as animation
        if (index === text.length - 1) {
          setTypingComplete(true);
        }
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <div className="flex flex-col items-center">
      <Button
        className={cn(
          "text-6xl font-bold text-bold text-center bg-transparent border-none hover:bg-transparent",
          roboto.className
        )}
        onClick={() => {
          // go to next page
        }}
      >
        {word}
        {!typingComplete && "|"}
      </Button>
    </div>
  );
};

export default function Home() {
  return (
    // center div on page
    <div className="flex justify-center items-center h-screen">
      {/* navbar without using flex */}
      <div className=""></div>
      <main>
        <Typewriter text="AugmentAI." />
      </main>
    </div>
  );
}
