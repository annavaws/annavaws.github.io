import { albert } from "@/styles/fonts";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import styles from "./project.module.css";
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Box() {
  const projects = [
    {
      id: 1,
      image: "/img1.png",
      title: "vlecture",
      description:
        "A notetaking companion app for students to upload the audio of their lectures and create personalized notes, flashcards, and quizzes based on the audio transcription.",
      techStack: "React, TailwindCSS",
    },
    {
      id: 2,
      image: "/img2.png",
      title: "Nubengine",
      description:
        "A project for the Information Retrieval class utlizing TF-IDF for indexing and uses medical datasets from ir-datasets",
      techStack: "Python, Django, Tailwind, GCP",
    },
    {
      id: 3,
      image: "/img3.png",
      title: "Invite",
      description:
        "A team-matcher project for the Software Engineering class for students to find teams to participate in a competition",
      techStack: "Python, Django, Tailwind, GCP, PostgreSQL, Docker",
    },
    {
      id: 4,
      image: "/img1.png",
      title: "CariPasien",
      description:
        "A project for the Advanced Programming class to facilitate doctor-patient for tooth treatments",
      techStack: "Spring Boot, NextJS, Tailwind, PostgreSQL, GCP",
    },
    {
      id: 5,
      image: "/img4.png",
      title: "Nutrious",
      description:
        "A project for the Platform-based Programming class aimed at enhancing nutritional standards and promoting a healthier lifestyle in Indonesia.",
      techStack: "Django, Flutter, Bootstrap, Railway",
    },
  ];

  return (
    <div
      className={`${albert.className}  min-h-screen flex justify-center bg-gradient-to-b from-blue-900 to-black text-white`}
    >
      <div className="mt-32 ml-10 w-full p-12">
        <div className="flex flex-col gap-12">
          <div className="font-semibold text-4xl text-left">My Projects</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
            {projects.map((project) => (
              <motion.ul
                className={`${styles.container}`}
                variants={container}
                initial="hidden"
                animate="visible"
                key={project.id}
              >
                <div
                  key={project.id}
                  className={`group relative w-full h-[300px] border border-opacity-20 hover:border-opacity-60 border-white rounded-xl shadow-md shadow-black transition duration-500 ease-in-out transform hover:-translate-y-2`}
                >
                  <Image
                    src={project.image}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-xl flex items-center justify-center p-5 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                    {/* <div className="absolute inset-0 object-cover object-center xl:object-bottom opacity-0 group-hover:opacity-100 transition-opacity"> */}
                    <div className="text-justify m-10 flex flex-col w-full">
                      <div className="text-xl font-bold mb-2">
                        {project.title}
                      </div>
                      <div className="mb-2">{project.description}</div>
                      <div className="text-md italic font-bold">
                        {project.techStack}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.ul>
            ))}
          </div>
        </div>
      </div>
      <div>Comming Soon!</div>
    </div>
  );
}
