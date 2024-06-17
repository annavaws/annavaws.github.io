import React, { useState, useEffect } from "react";
import { WoobleButton } from "@/components/ui/wooble-button";
import { albert } from "@/styles/fonts";
import Link from "next/link";
import { TextGenerateEffect } from "@/components/ui/text-generate";

const About = () => {
  const initialText =
    "Annava is a third-year Computer Science student at the University of Indonesia with a keen interest in Software Engineering. Dedicated to expanding her knowledge, she is actively engaged in learning and applying her skills in both Front End and Back End Development. Her enthusiasm for mastering new technologies drives her to create comprehensive solutions in her projects.";

  const originalText = `
    <div class="text-slate-400 font-thin">
      Annava is a third-year 
      <span class="text-white font-semibold">Computer Science</span> 
      student at the 
      <span class="text-white font-semibold">University of Indonesia</span> 
      with a keen interest in 
      <span class="text-white font-semibold">Software Engineering</span>. 
      Dedicated to expanding her knowledge, she is actively engaged in learning and applying her skills 
      in both 
      <span class="text-white font-semibold">Front End</span> and 
      <span class="text-white font-semibold">Back End Development</span>. 
      Her enthusiasm for mastering new technologies drives her to create comprehensive solutions 
      in her projects.
    </div>
  `;

  const [showOriginalText, setShowOriginalText] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowOriginalText(true);
    }, 12000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <div
        className={`${albert.className} min-h-screen flex justify-center  bg-gradient-to-b from-black to-gray-900 p-5`}
      >
        <div className="flex flex-col text-slate-200 p-10 md:p-32 justify-between gap-10">
          <div className="font-semibold text-5xl md:text-5xl">About Me</div>
          <div className="text-2xl md:text-3xl text-justify text-gray-300">
            <span dangerouslySetInnerHTML={{ __html: originalText }} />
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
