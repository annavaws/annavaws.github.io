import { albert } from "@/styles/fonts";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div
        className={`${albert.className} min-h-screen flex justify-center  bg-gradient-to-tl from-black to-gray-900 p-5`}
      >
        <div className="flex flex-col text-white p-10 md:p-32 justify-between gap-10">
          <div className="font-semibold text-5xl md:text-5xl">About Me</div>
          <div className="text-2xl md:text-3xl text-justify">
            Annava is a third-year Computer Science student at the University of
            Indonesia with a keen interest in Software Engineering. Dedicated to
            expanding her knowledge, she is actively engaged in learning and
            applying her skills in both Front End and Back End Development. Her
            enthusiasm for mastering new technologies drives her to create
            comprehensive solutions in her projects.
          </div>
          <div>
            <Link
              href={"/about"}
              className="inline-block border border-white font-semibold text-md md:text-2xl py-3 px-10 rounded-[60px] mt-2 transition-all duration-300 hover:bg-purple-500 hover:text-black hover:border-black z-10
        "
            >
              Get to know me more
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
