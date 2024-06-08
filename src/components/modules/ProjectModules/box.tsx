import { albert } from "@/styles/fonts";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Button2 } from "@/components/ui/button";
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.8,
    },
  },
};

export default function Box() {
  const projects = [
    {
      id: 1,
      image: "/vlecture.png",
      title: "vlecture",
      description:
        "A notetaking companion app for students to upload the audio of their lectures and create personalized notes, flashcards, and quizzes based on the audio transcription.",
      techStack: ["FastAPI", "NextJS", "MongoDB", "Supabase", "Railway"],
      live: "https://vlecture.tech/",
      repo: "https://github.com/vlecture/vlecture-api",
    },
    {
      id: 2,
      image: "/nubengine.png",
      title: "Nubengine",
      description:
        "A project for the Information Retrieval class utlizing TF-IDF for indexing and uses medical datasets from ir-datasets",
      techStack: ["Python", "Django", "Tailwind", "GCP"],
      live: "http://nubengine.annavaws.com",
      repo: "https://github.com/daffafaizan/nubengine",
    },
    {
      id: 3,
      image: "/invite.png",
      title: "Invite",
      description:
        "A team-matcher project for the Software Engineering class for students to find teams to participate in a competition",
      techStack: [
        "Python",
        "Django",
        "Tailwind",
        "GCP",
        "PostgreSQL",
        "Docker",
      ],
      live: "http://rpl-a12.et.r.appspot.com/",
      repo: "https://github.com/daffafaizan/invite-app",
    },
    {
      id: 4,
      image: "/caper.png",
      title: "CariPasien",
      description:
        "A project for the Advanced Programming class to facilitate doctor-patient for tooth treatments",
      techStack: ["Spring Boot", "NextJS", "Tailwind", "PostgreSQL", "GCP"],
      live: "http://caper-dev.vercel.app",
      repo: "",
    },
    {
      id: 5,
      image: "/nutrious.png",
      title: "Nutrious",
      description:
        "A project for the Platform-based Programming class aimed at enhancing nutritional standards and promoting a healthier lifestyle in Indonesia.",
      techStack: ["Django", "Flutter", "Bootstrap", "Railway"],
      live: "https://nutrious.herokuapp.com/",
      repo: "https://github.com/jaycentg/nutrious",
    },
    {
      id: 6,
      image: "/portfolio.png",
      title: "Portfolio",
      description:
        "My portfolio website featuring finished projects, technologies, blogs, and socials.",
      techStack: ["NextJS", "TypeScript", "Tailwind", "Netlify"],
      live: "https://annavaws.com",
      repo: "https://github.com/annavaws/my-portfolio",
    },
  ];

  return (
    <div
      className={`${albert.className}  min-h-screen flex justify-center bg-gradient-to-b from-blue-900 to-black text-white`}
    >
      <div className="mt-32 w-full p-12">
        <div className="flex flex-col gap-12">
          <div className="font-semibold text-4xl text-left">My Projects</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projects.map((project) => (
              <motion.ul
                variants={container}
                initial="hidden"
                animate="visible"
                key={project.id}
              >
                <div
                  key={project.id}
                  className={`group relative w-full h-[430px] md:h-[400px] lg:h-[340px] border hover:border-gray-100 border-gray-500 rounded-xl shadow-md shadow-black transition duration-500 ease-in-out transform hover:-translate-y-2`}
                >
                  <Image
                    src={project.image}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                    alt={project.title}
                  />
                  <div className="absolute inset-0 flex-col bg-black bg-opacity-60 rounded-xl flex items-center justify-center p-5 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-md transition duration-300 ease-in-out">
                    {/* <div className="absolute inset-0 object-cover object-center xl:object-bottom opacity-0 group-hover:opacity-100 transition-opacity"> */}
                    <div className="text-justify h-full mx-10 p-3 md:p-8 flex flex-col w-full justify-between">
                      <div className="text-xl font-bold mb-2">
                        {project.title}
                      </div>
                      <div className="mb-2">{project.description}</div>
                      <div className="text-md italic font-bold flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Button2
                            className="cursor-default hover:text-purple-300 hover:border-purple-300 px-6 py-2 bg-transparent text-white border-white border rounded-full"
                            key={tech}
                          >
                            {tech}
                          </Button2>
                        ))}
                      </div>
                      <div className="flex flex-row justify-between w-full mt-2">
                        <div className="w-1/2">
                          <a
                            href={project.live}
                            target="_blank"
                            className="mr-3 whitespace-nowrap flex flex-grow items-center space-x-2"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                  d="M15.7281 3.88396C17.1624 2.44407 19.2604 2.41383 20.4219 3.57981C21.5856 4.74798 21.5542 6.85922 20.1189 8.30009L17.6951 10.7333C17.4028 11.0268 17.4037 11.5017 17.6971 11.794C17.9906 12.0863 18.4655 12.0854 18.7578 11.7919L21.1816 9.35869C23.0929 7.43998 23.3329 4.37665 21.4846 2.5212C19.6342 0.663551 16.5776 0.905664 14.6653 2.82536L9.81768 7.69182C7.90639 9.61053 7.66643 12.6739 9.5147 14.5293C9.80702 14.8228 10.2819 14.8237 10.5754 14.5314C10.8688 14.2391 10.8697 13.7642 10.5774 13.4707C9.41376 12.3026 9.4451 10.1913 10.8804 8.75042L15.7281 3.88396Z"
                                  fill="#ffffff"
                                ></path>{" "}
                                <path
                                  opacity="0.5"
                                  d="M14.4846 9.4707C14.1923 9.17724 13.7174 9.17632 13.4239 9.46864C13.1305 9.76097 13.1296 10.2358 13.4219 10.5293C14.5856 11.6975 14.5542 13.8087 13.1189 15.2496L8.27129 20.1161C6.83696 21.556 4.73889 21.5862 3.57742 20.4202C2.41376 19.2521 2.4451 17.1408 3.8804 15.6999L6.30424 13.2666C6.59657 12.9732 6.59565 12.4983 6.30219 12.206C6.00873 11.9137 5.53386 11.9146 5.24153 12.208L2.81769 14.6413C0.906387 16.56 0.666428 19.6234 2.5147 21.4788C4.36518 23.3365 7.42173 23.0944 9.334 21.1747L14.1816 16.3082C16.0929 14.3895 16.3329 11.3262 14.4846 9.4707Z"
                                  fill="#ffffff"
                                ></path>{" "}
                              </g>
                            </svg>
                            <div>Live</div>
                          </a>
                        </div>

                        <div className="w-1/2">
                          <a
                            href={project.repo}
                            target="_blank"
                            className="mr-3 whitespace-nowrap flex flex-grow items-center space-x-2 "
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                  d="M15.7281 3.88396C17.1624 2.44407 19.2604 2.41383 20.4219 3.57981C21.5856 4.74798 21.5542 6.85922 20.1189 8.30009L17.6951 10.7333C17.4028 11.0268 17.4037 11.5017 17.6971 11.794C17.9906 12.0863 18.4655 12.0854 18.7578 11.7919L21.1816 9.35869C23.0929 7.43998 23.3329 4.37665 21.4846 2.5212C19.6342 0.663551 16.5776 0.905664 14.6653 2.82536L9.81768 7.69182C7.90639 9.61053 7.66643 12.6739 9.5147 14.5293C9.80702 14.8228 10.2819 14.8237 10.5754 14.5314C10.8688 14.2391 10.8697 13.7642 10.5774 13.4707C9.41376 12.3026 9.4451 10.1913 10.8804 8.75042L15.7281 3.88396Z"
                                  fill="#ffffff"
                                ></path>{" "}
                                <path
                                  opacity="0.5"
                                  d="M14.4846 9.4707C14.1923 9.17724 13.7174 9.17632 13.4239 9.46864C13.1305 9.76097 13.1296 10.2358 13.4219 10.5293C14.5856 11.6975 14.5542 13.8087 13.1189 15.2496L8.27129 20.1161C6.83696 21.556 4.73889 21.5862 3.57742 20.4202C2.41376 19.2521 2.4451 17.1408 3.8804 15.6999L6.30424 13.2666C6.59657 12.9732 6.59565 12.4983 6.30219 12.206C6.00873 11.9137 5.53386 11.9146 5.24153 12.208L2.81769 14.6413C0.906387 16.56 0.666428 19.6234 2.5147 21.4788C4.36518 23.3365 7.42173 23.0944 9.334 21.1747L14.1816 16.3082C16.0929 14.3895 16.3329 11.3262 14.4846 9.4707Z"
                                  fill="#ffffff"
                                ></path>{" "}
                              </g>
                            </svg>
                            <div>Repo</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
