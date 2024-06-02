import { useState, useEffect, useRef } from "react";
import { poppins } from "@/styles/fonts";

export default function Header() {
  const title = "SOFTWARE - ENGINEER";
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
    <div className="text-white  bg-gradient-to-tr from-gray-900 to-black p-5 min-h-screen flex justify-center items-center">
      <div className="flex flex-col w-full h-full overflow-hidden gap-8 md:gap-2">
        <div
          className={`select-none flex gap-1 md:gap-2 font-bold text-[80px] md:text-[120px] lg:text-[160px] text-gray-500 ${poppins.className}`}
          style={{ transform: `translateX(${offsetTitle}px)` }}
          ref={titleRef}
        >
          {characters.map((char, index) => (
            <span key={index} className="hover:text-white">
              {char}
            </span>
          ))}
        </div>

        {/* <hr
          className="w-full border-t-4 border-transparent bg-gradient-to-r from-yellow-400 to-black via-yellow-400 repeat-x self-end mt-5 mb-5"
          style={{ backgroundSize: "20px 4px" }}
        ></hr> */}
        <hr
          className="w-1/2 border-t border-transparent bg-gradient-to-r from-gray-900 to-purple-500 self-end mt-5 mb-5 rounded-l-md"
          style={{ height: "4px" }}
        ></hr>
        {/* <hr
          className="w-1/2 border-t border-transparent bg-gradient-to-r from-purple-500 to-black self-right mt-5 mb-5 rounded-l-md"
          style={{ height: "4px" }}
        ></hr> */}

        <div
          className={`select-none flex gap-1 md:gap-2 font-bold text-[40px] md:text-[80px] lg:text-[120px] text-gray-500 ${poppins.className}`}
          style={{ transform: `translateX(${offsetName}px)` }}
          ref={nameRef}
        >
          {name.split("").map((char, index) => (
            <span key={index} className="hover:text-purple-500">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        <hr
          className="w-1/2 border-t border-transparent bg-gradient-to-r from-orange-500 to-gray-900 self-right mt-5 mb-5 rounded-l-md"
          style={{ height: "4px" }}
        ></hr>
        {/* <hr
          className="w-1/2 border-t border-transparent bg-gradient-to-r from-black to-orange-500 self-end mt-5 mb-5 rounded-l-md"
          style={{ height: "4px" }}
        ></hr> */}
      </div>
    </div>
  );
}
