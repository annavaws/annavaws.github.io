import { poppins, anton, rowdies } from "@/styles/fonts";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-bg";
import Marquee from "react-fast-marquee";

export default function Header() {
  const title = "SOFTWARE ENGINEER";
  const name = "ANNAVA WISHA SIKOKO";

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
            <Marquee gradient={false} pauseOnHover={true} speed={100}>
              <div
                className={`select-none flex gap-1 text-[60px] md:text-[80px] lg:text-[96px] ${anton.className}`}
              >
                {title.split("").map((char, index) => (
                  <span key={index} className="hover:text-purple-500">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
            </Marquee>
            <div className="m-10"></div>
            <Marquee
              gradient={false}
              speed={100}
              direction="right"
              pauseOnHover={true}
            >
              <div
                className={`select-none flex gap-1 font-bold text-[40px] md:text-[72px] lg:text-[70px] ${anton.className}`}
              >
                {name.split("").map((char, index) => (
                  <span key={index} className="hover:text-cyan-300">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
