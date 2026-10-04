import dynamic from "next/dynamic";
import React from "react";
import { Reveal, SectionHeading } from "@/components/ui/reveal";

const RocketGame = dynamic(() => import("@/components/game/rocket-game"), {
  ssr: false,
  loading: () => (
    <div className="panel h-[min(70vh,560px)] min-h-[420px] animate-pulse" />
  ),
});

export default function Game() {
  return (
    <section id="game" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading title="Take the rocket for a spin" />
        <Reveal>
          <RocketGame />
        </Reveal>
      </div>
    </section>
  );
}
