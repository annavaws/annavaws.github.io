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
    const titleWidth = titleRef.current?.offsetWidth || 0;
    const nameWidth = nameRef.current?.offsetWidth || 0;
    const containerWidth = window.innerWidth;

    const interval = setInterval(() => {
      setOffsetTitle((prevOffsetTitle) => {
        if (prevOffsetTitle <= -titleWidth) {
          return containerWidth;
        }
        return prevOffsetTitle - 1;
      });
      setOffsetName((prevOffsetName) => {
        if (prevOffsetName >= containerWidth) {
          return -nameWidth;
        }
        return prevOffsetName + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [titleRef, nameRef]);

  return (
    <div className="text-white bg-black min-h-screen flex justify-center items-center">
      <div className="flex flex-col w-full h-full">
        <div
          className={` select-none flex-row flex gap-2 font-bold text-[160px] text-gray-500 ${poppins.className}`}
          style={{ marginLeft: offsetTitle }}
          ref={titleRef}
        >
          {characters.map((char, index) => (
            <div key={index} className="hover:text-white">
              {char}
            </div>
          ))}
        </div>

        <div
          className={`select-none flex-row flex gap-2 font-bold text-[120px] text-gray-500 ${poppins.className}`}
          style={{ marginLeft: offsetName }}
          ref={nameRef}
        >
          {name.split("").map((char, index) => (
            <div key={index} className="hover:text-white">
              {char === " " ? "\u00A0" : char}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
