import { albert } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

export default function AboutMore() {
  return (
    <div className={`${albert.className} min-h-screen overflow-hidden`}>
      <Parallax pages={1.3} className=" hidden md:block">
        {/* Background Gradient Layers */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          className="bg-gradient-to-b from-gray-900 to-yellow-900"
        />
        <ParallaxLayer offset={1} speed={0.5} className="bg-yellow-900" />

        {/* Background Image Layers */}
        <ParallaxLayer
          offset={0}
          speed={0.3}
          style={{ opacity: 0.5 }}
          className="pointer-events-none"
        >
          <div className="w-full absolute inset-0 flex justify-end self-start mt-32">
            <Image
              src="/moon.png"
              alt="Moon"
              width={300}
              height={400}
              className="object-scale-down"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.1}
          speed={0.2}
          style={{ opacity: 0.8 }}
          className="pointer-events-none"
        >
          <div className="absolute inset-0 flex justify-left self-baseline">
            <Image
              src="/bird.png"
              alt="Bird"
              width={600}
              height={300}
              className="object-fill"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.3}
          speed={0.4}
          style={{ opacity: 1 }}
          className="pointer-events-none hidden md:block"
        >
          <div className="absolute inset-0 flex justify-center">
            <Image
              src="/mountain3.png"
              alt="Mountain"
              width={600}
              height={500}
              quality={100}
              className="object-contain w-full lg:block sm:hidden"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.5}
          speed={0.5}
          style={{ opacity: 1 }}
          className="pointer-events-none"
        >
          <div className="absolute inset-0 flex justify-center">
            <Image
              src="/mountain2.png"
              alt="Mountain"
              width={600}
              height={500}
              quality={100}
              className="object-cover lg:object-contain w-full"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.6}
          speed={0.3}
          style={{ opacity: 1 }}
          className="pointer-events-none"
        >
          <div className="absolute inset-0 flex justify-center h-full w-full">
            <Image
              src="/mountain.png"
              alt="Mountain"
              fill
              quality={100}
              className="object-cover lg:object-contain w-full"
            />
          </div>
        </ParallaxLayer>

        {/* Content Layer */}
        <ParallaxLayer
          offset={0.2}
          speed={0.5}
          className="flex justify-center items-center"
        >
          <div className="lg:max-w-5xl md:max-w-3xl max-w-lg  mx-auto p-10 md:p-5 bg-black/80 rounded-xl shadow-lg shadow-gray-600">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="relative lg:sticky  lg:top-40 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]">
                <Image
                  src="/me.jpg"
                  fill
                  style={{ objectFit: "cover" }}
                  alt="Annava"
                  className="rounded-full shadow-lg"
                />
              </div>
              <div className="lg:w-1/2 flex flex-col items-center text-slate-200">
                <h1 className="font-bold text-2xl md:text-4xl lg:text-6xl text-center mb-5">
                  About Me
                </h1>
                <div className="text-md md:text-lg lg:text-xl text-justify text-gray-300 font-thin">
                  <span className="text-white font-semibold">Annava</span>, a
                  third-year{" "}
                  <span className="text-white font-semibold">
                    Computer Science
                  </span>{" "}
                  student at the{" "}
                  <span className="text-white font-semibold">
                    University of Indonesia
                  </span>
                  , is deeply passionate about{" "}
                  <span className="text-white font-semibold">
                    Software Engineering
                  </span>
                  . She&apos;s dedicated to expanding her expertise, actively
                  engaging in learning and applying her skills in both{" "}
                  <span className="text-white font-semibold">
                    Front End and Back End Development
                  </span>
                  . She is proficient in programming languages such as{" "}
                  <span className="text-white font-semibold">
                    Python, Java, JavaScript, TypeScript, HTML, and CSS
                  </span>
                  . Annava leverages{" "}
                  <span className="text-white font-semibold">PostgreSQL</span>{" "}
                  for robust database solutions.
                </div>
                <p className="text-lg md:text-xl text-justify mt-5 text-gray-300">
                  Her enthusiasm for software engineering is evident in her
                  mastery of diverse frameworks including{" "}
                  <span className="text-white font-semibold">
                    {" "}
                    Django, FastAPI, Flutter, SpringBoot, NextJS, Bootstrap,
                    Tailwind and Laravel
                  </span>
                  . This enables her to deliver{" "}
                  <span className="text-white font-semibold">
                    {" "}
                    responsive, aesthetically appealing
                  </span>{" "}
                  applications. Committed to continual learning, Annava eagerly
                  explores cutting-edge technologies, aiming to make a
                  meaningful impact in the software engineering field. Whether
                  it’s crafting elegant user interfaces or optimizing
                  server-side logic, Annava’s dedication and curiosity drive her
                  forward.
                </p>
              </div>
            </div>
            <div className="mt-14 flex justify-end text-slate-200 text-opacity-80 text-sm md:text-base hover:underline animate-bounce">
              <Link
                href="/project"
                className="flex whitespace-nowrap space-x-2"
              >
                <span>Discover more about my projects here</span>
                <FaArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
      <div className="md:hidden bg-gradient-to-b from-gray-900 to-yellow-900 pt-32 pb-32">
        <div className="max-w-xl mx-auto p-10">
          <div className="flex flex-col  items-center gap-10">
            <div className="relative w-[300px] h-[300px]">
              <Image
                src="/me.jpg"
                fill
                style={{ objectFit: "cover" }}
                alt="Annava"
                className="rounded-full shadow-lg"
              />
            </div>
            <div className="flex flex-col items-center text-slate-200">
              <h1 className="font-bold text-2xl text-center mb-5">About Me</h1>
              <div className="text-md md:text-lg lg:text-xl text-justify text-gray-300 font-thin">
                <span className="text-white font-semibold">Annava</span>, a
                third-year{" "}
                <span className="text-white font-semibold">
                  Computer Science
                </span>{" "}
                student at the{" "}
                <span className="text-white font-semibold">
                  University of Indonesia
                </span>
                , is deeply passionate about{" "}
                <span className="text-white font-semibold">
                  Software Engineering
                </span>
                . She&apos;s dedicated to expanding her expertise, actively
                engaging in learning and applying her skills in both{" "}
                <span className="text-white font-semibold">
                  Front End and Back End Development
                </span>
                . She is proficient in programming languages such as{" "}
                <span className="text-white font-semibold">
                  Python, Java, JavaScript, TypeScript, HTML, and CSS
                </span>
                . Annava leverages{" "}
                <span className="text-white font-semibold">PostgreSQL</span> for
                robust database solutions.
              </div>
              <p className="text-lg md:text-xl text-justify mt-5 text-gray-300">
                Her enthusiasm for software engineering is evident in her
                mastery of diverse frameworks including{" "}
                <span className="text-white font-semibold">
                  {" "}
                  Django, FastAPI, Flutter, SpringBoot, NextJS, Bootstrap,
                  Tailwind and Laravel
                </span>
                . This enables her to deliver{" "}
                <span className="text-white font-semibold">
                  {" "}
                  responsive, aesthetically appealing
                </span>{" "}
                applications. Committed to continual learning, Annava eagerly
                explores cutting-edge technologies, aiming to make a meaningful
                impact in the software engineering field. Whether it’s crafting
                elegant user interfaces or optimizing server-side logic,
                Annava’s dedication and curiosity drive her forward.
              </p>
            </div>
          </div>
          <div className="mt-14 flex justify-end text-slate-200 text-opacity-80 text-sm md:text-base hover:underline animate-bounce">
            <Link href="/project" className="flex whitespace-nowrap space-x-2">
              <span>Discover more about my projects here</span>
              <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
