import React from "react";
import { WoobleButton } from "@/components/ui/wooble-button";
import { albert } from "@/styles/fonts";
import Link from "next/link";
import { Highlight } from "@/components/ui/highlight";

const About = () => {
  return (
    <>
      <div
        className={`${albert.className} min-h-screen flex justify-center bg-gradient-to-b from-black to-gray-900 p-5`}
      >
        <div className="flex flex-col text-slate-200 p-10 md:p-32 justify-evenly lg:justify-between gap-10">
          <div className="font-semibold text-3xl md:text-5xl">About Me</div>
          <div className="text-xl md:text-2xl lg:text-3xl text-justify text-gray-300">
            <div className="text-slate-400 font-thin">
              <Highlight className="text-slate-200 font-semibold">
                Annava
              </Highlight>{" "}
              is a final-year{" "}
              <Highlight className="text-slate-200 font-semibold">
                Computer Science
              </Highlight>{" "}
              student at the{" "}
              <Highlight className="text-slate-200 font-semibold">
                University of Indonesia
              </Highlight>{" "}
              with a keen interest in{" "}
              <Highlight className="text-slate-200 font-semibold">
                Software Engineering
              </Highlight>
              . Dedicated to expanding her knowledge, she is actively engaged in
              learning and applying her skills in both{" "}
              <Highlight className="text-slate-200 font-semibold">
                Front End
              </Highlight>{" "}
              and{" "}
              <Highlight className="text-slate-200 font-semibold">
                Back End Development
              </Highlight>
              . Her enthusiasm for mastering new technologies drives her to
              create comprehensive solutions in her projects.
            </div>
          </div>

          <div className="flex">
            <Link href={"/about"}>
              <WoobleButton className="px-10 hover:duration-500">
                <span className="font-semibold text-md md:text-2xl">
                  Get to know me more
                </span>
              </WoobleButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
