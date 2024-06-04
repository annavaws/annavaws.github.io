import { albert } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function AboutMore() {
  return (
    <div
      className={`${albert.className} min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-black p-5`}
    >
      <div className="max-w-4xl mt-40 mx-auto p-5 bg-black/60 rounded-xl shadow-lg shadow-gray-600">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="relative lg:sticky lg:top-40 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-1/2">
            <Image
              src="/me.jpg"
              layout="fill"
              objectFit="cover"
              alt="Annava"
              className="rounded-full shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 flex flex-col items-center text-white">
            <h1 className="font-bold text-4xl md:text-6xl text-center mb-5">
              About Me
            </h1>
            <p className="text-lg md:text-xl text-justify">
              <b>Annava</b>, a third-year Computer Science student at the University
              of Indonesia, is deeply passionate about <b> Software Engineering</b>. She’s
              dedicated to expanding her expertise, actively engaging in
              learning and applying her skills in both Front End and Back End
              Development. She is proficient in programming languages such as
              Python, Java, JavaScript, TypeScript, HTML, and CSS, and adept at
              utilizing PostgreSQL for robust database solutions.
            </p>
            <p className="text-lg md:text-xl text-justify mt-5">
              Her enthusiasm for software engineering is evident in her mastery
              of diverse frameworks including Django, Flutter, Spring Boot,
              ReactJS, Bootstrap, Tailwind, and Laravel. This enables her to
              deliver responsive, aesthetically appealing applications.
              Committed to continual learning, Annava is driven to explore
              cutting-edge technologies and innovative solutions, aiming to make
              a meaningful impact in the software engineering field.
            </p>
          </div>
        </div>
        <div className="mt-14 flex justify-end  text-white text-opacity-80 text-sm md:text-base hover:underline animate-bounce ">
          {" "}
          <Link href="/project" className="flex  whitespace-nowrap  space-x-2 ">
            <span>Discover more about my projects here</span>
            <FaArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
