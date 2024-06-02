import { albert } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AboutMore() {
  return (
    <div
      className={`${albert.className} min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-black p-5`}
    >
      <div className="max-w-4xl mx-auto p-5 bg-black/60 rounded-xl shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 flex flex-col items-center text-white">
            <h1 className="font-bold text-4xl md:text-6xl text-center mb-5">
              About Me
            </h1>
            <p className="text-lg md:text-xl text-justify">
              Annava is a third-year Computer Science student at the University
              of Indonesia, passionately diving into Software Engineering. She’s
              dedicated to expanding her expertise, actively engaging in
              learning and applying her skills in both Front End and Back End
              Development. Her drive to master new technologies motivates her to
              craft innovative and comprehensive solutions in her projects.
            </p>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/me.jpg"
              width={600}
              height={600}
              alt="Annava"
              className="rounded-full shadow-lg"
            />
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/project"
            className="text-white text-opacity-80 text-sm md:text-base hover:underline hover:text-gray-400"
          >
            Discover more about my projects and skills here !
          </Link>
        </div>
      </div>
    </div>
  );
}
