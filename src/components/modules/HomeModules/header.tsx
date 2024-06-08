import { useState, useEffect, useRef } from "react";
import { poppins } from "@/styles/fonts";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-bg";

export default function Header() {
  const title = "SOFTWARE ENGINEER";
  const characters = title.split("");
  const name = "ANNAVA WISHA SIKOKO";

  const [offsetTitle, setOffsetTitle] = useState(0);
  const [offsetName, setOffsetName] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      const titleWidth = titleRef.current?.offsetWidth ?? 0;
      const nameWidth = nameRef.current?.offsetWidth ?? 0;

      const titleInterval = setInterval(() => {
        setOffsetTitle((prevOffset) => {
          const nextOffset = prevOffset - 1;
          return nextOffset < -titleWidth ? titleWidth : nextOffset;
        });
      }, 70);

      const nameInterval = setInterval(() => {
        setOffsetName((prevOffset) => {
          const nextOffset = prevOffset + 1;
          return nextOffset > nameWidth ? -nameWidth : nextOffset;
        });
      }, 70);

      return () => {
        clearInterval(titleInterval);
        clearInterval(nameInterval);
      };
    };

    updateDimensions();
  }, []);

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <div className="text-gray-200 mix-blend-color-dodge p-5 min-h-screen flex justify-center items-center">
          <div className="flex flex-col w-full h-full overflow-hidden gap-8 md:gap-2">
            <div
              className={`select-none flex gap-1 md:gap-2 font-bold text-[50px] md:text-[80px] lg:text-[110px] ${poppins.className}`}
              style={{ transform: `translateX(${offsetTitle}px)` }}
              ref={titleRef}
            >
              {characters.map((char, index) => (
                <span key={index} className="hover:text-purple-500">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div className="m-10"></div>
            <div
              className={`select-none flex gap-1 md:gap-2 font-bold text-[40px] md:text-[70px] lg:text-[100px] ${poppins.className}`}
              style={{ transform: `translateX(${offsetName}px)` }}
              ref={nameRef}
            >
              {name.split("").map((char, index) => (
                <span key={index} className="hover:text-cyan-300">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
