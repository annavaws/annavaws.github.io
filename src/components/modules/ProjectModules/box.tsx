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
      description: "This is an awesome project using React and TailwindCSS.",
      techStack: "React, TailwindCSS",
    },
    {
      id: 2,
      image: "/img2.png",
      title: "Project 2",
      description: "A backend API built with Node.js and Express.",
      techStack: "Node.js, Express",
    },
    {
      id: 3,
      image: "/img3.png",
      title: "Project 3",
      description: "A mobile app created with Flutter.",
      techStack: "Flutter, Dart",
    },
    {
      id: 4,
      image: "/img1.png",
      title: "Project 4",
      description: "Data visualization with D3.js.",
      techStack: "D3.js",
    },
    {
      id: 5,
      image: "/img3.png",
      title: "Project 5",
      description: "A full-stack application using MERN stack.",
      techStack: "MongoDB, Express, React, Node.js",
    },
    {
      id: 6,
      image: "/img2.png",
      title: "Project 6",
      description: "An ecommerce platform built with Laravel.",
      techStack: "Laravel, PHP",
    },
  ];

  return (
    <div
      className={`${albert.className}  min-h-screen flex justify-center bg-gradient-to-b from-blue-900 to-black text-white`}
    >
      <div className="mt-32 w-full p-12">
        <div className="flex flex-col gap-12">
          <div className="font-semibold text-4xl text-left">My Projects</div>
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.ul
              className={`${styles.container}`}
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {projects.map((project) => (
                <motion.li
                  variants={item}
                  key={project.id}
                  className={`${styles.item} group relative w-full h-[400px] rounded-xl shadow-lg shadow-gray-600 transition duration-500 ease-in-out transform hover:-translate-y-2`}
                >
                  <Image
                    src={project.image}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-xl flex items-center justify-center p-5 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="mb-2">{project.description}</p>
                      <p className="text-sm italic">{project.techStack}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
      <div>Comming Soon!</div>
    </div>
  );
}
