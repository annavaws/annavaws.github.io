import React, { useState, useEffect, useRef } from "react";
import { poppins } from "@/styles/fonts";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const title_right = "SOFTWARE";
  const title_left = "ENGINEER";
  const name = "ANNAVA WISHA SIKOKO";

  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [offsetName, setOffsetName] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const threshold = window.innerHeight / 9;
        const maxTranslate = window.innerWidth / 4; // Maximum translation based on window width
        const currentScroll = window.scrollY;
        const translate = Math.min(currentScroll / threshold, 1) * maxTranslate;

        setTranslateValue(translate);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateNameMovement = () => {
      if (nameRef.current) {
        const nameWidth = nameRef.current.offsetWidth;

        const nameInterval = setInterval(() => {
          setOffsetName((prevOffset) => {
            const nextOffset = prevOffset + 1;
            return nextOffset > nameWidth ? -nameWidth : nextOffset;
          });
        }, 30);

        return () => clearInterval(nameInterval);
      }
    };

    updateNameMovement();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-gray-900 to-black p-5 flex justify-center items-center">
      <div className="flex flex-col w-full  mt-60 gap-8 md:gap-2">
        <div
          ref={containerRef}
          className="select-none flex font-semibold text-gray-500"
        >
          <div className="flex flex-row justify-between w-full text-[32px] md:text-[60px] lg:text-[88px] gap-3">
            <div
              className="w-1/2 transition-all duration-200 ease-in-out flex"
              style={{ transform: `translateX(-${translateValue}px)` }}
            >
              {title_right.split("").map((char, index) => (
                <span key={index} className="hover:text-slate-200">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>

            <div className="w-1/5 items-center flex ">
              <hr
                className="flex-grow bg-transparant"
                style={{ height: "10px" }}
              ></hr>
            </div>
            <div
              className="w-1/2 transition-all duration-200 ease-in-out flex justify-end"
              style={{ transform: `translateX(${translateValue}px)` }}
            >
              {title_left.split("").map((char, index) => (
                <span key={index} className="hover:text-slate-200">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        </div>
        <hr
          className="w-1/2 border-t border-transparent bg-gradient-to-r from-gray-900 to-purple-500 self-end mt-5 mb-5 rounded-l-md"
          style={{ height: "4px" }}
        ></hr>
        <div
          className={`select-none flex font-bold text-[30px] md:text-[80px] lg:text-[100px] text-gray-500 ${poppins.className}`}
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
      </div>
    </div>
  );
};

export default Header;
