import { albert } from "@/styles/fonts";

export default function About() {
  return (
    <>
      <div
        className={`${albert.className} min-h-screen flex justify-center bg-black`}
      >
        <div className="flex flex-col text-white p-32 justify-between">
          <div className="font-semibold text-[100px]">About Me</div>
          <div className="text-[30px] text-justify">
            Annava is a third-year Computer Science student at the University of
            Indonesia with a keen interest in Software Engineering. Dedicated to
            expanding her knowledge, she is actively engaged in learning and
            applying her skills in both Front End and Back End Development. Her
            enthusiasm for mastering new technologies drives her to create
            comprehensive solutions in her projects.
          </div>
          <div>
            <button
              className="inline-block border border-white font-semibold text-[24px] py-3 px-10 rounded-[60px] mt-2 transition-all duration-300 hover:bg-purple-500 hover:text-black hover:border-black z-10
        "
            >
              Get to know me more
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
