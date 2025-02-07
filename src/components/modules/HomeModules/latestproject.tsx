import { albert } from "@/styles/fonts";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function Latest() {
  const projects = [
    {
      id: 1,
      image: "/my-portfolio/vlecture.png",
      title: "vlecture",
      description:
        "A notetaking companion app for students to upload the audio of their lectures and create personalized notes, flashcards, and quizzes based on the audio transcription.",
      techStack: ["FastAPI", "NextJS", "MongoDB", "Supabase", "Railway"],
      live: "https://vlecture.tech/",
      repo: "https://github.com/vlecture/vlecture-api",
    },

    {
      id: 2,
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
      id: 3,
      image: "/portfolio.png",
      title: "Portfolio",
      description:
        "My portfolio website featuring finished projects, technologies, blogs, and socials.",
      techStack: ["NextJS", "TypeScript", "Tailwind", "Netlify"],
      live: "https://annavaws.com",
      repo: "https://github.com/annavaws/my-portfolio",
    },
    {
      id: 4,
      image: "/nubengine.png",
      title: "Nubengine",
      description:
        "A project for the Information Retrieval class utlizing TF-IDF for indexing and uses medical datasets from ir-datasets",
      techStack: ["Python", "Django", "Tailwind", "GCP"],
      live: "http://nubengine.annavaws.com",
      repo: "https://github.com/daffafaizan/nubengine",
    },
  ];

  return (
    <div className="p-10 lg:p-20 bg-gradient-to-t from-black to-gray-900">
      <div
        className={`${albert.className} flex justify-center w-full flex-col backdrop-blur-xl text-slate-200`}
      >
        <div className="px-16 flex w-full font-semibold text-5xl md:text-5xl mb-10">
          Latest Projects
        </div>
        <div className="px-0 lg:px-12 flex text-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-12">
            {projects.map((project) => (
              <CardContainer
                key={project.id}
                className="inter-var px-10 -mt-20"
              >
                <CardBody className="relative group/card hover:shadow-2xl hover:shadow-purple-500/20 bg-black/30 w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  <CardItem className="text-xl font-bold">
                    {project.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    className="text-sm max-w-sm mt-2 text-neutral-300"
                  >
                    {project.description}
                  </CardItem>
                  <CardItem className="w-full mt-4">
                    <Image
                      src={project.image}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={project.title}
                    />
                  </CardItem>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.techStack.map((tech, index) => (
                      <CardItem
                        key={index}
                        className="bg-transparent border border-white text-white rounded-full px-4 py-2 text-xs"
                      >
                        {tech}
                      </CardItem>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-10">
                    <CardItem
                      as="a"
                      target="_blank"
                      href={project.live}
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-normal font-bold hover:bg-slate-500"
                    >
                      Live
                    </CardItem>
                    <CardItem
                      as="a"
                      target="_blank"
                      href={project.repo}
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-normal font-bold hover:bg-slate-500"
                    >
                      Repo
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-end text-slate-200 text-opacity-80 text-sm md:text-base hover:underline animate-bounce">
        <Link href="/project" className="flex whitespace-nowrap space-x-2">
          <span>Discover more about my projects here</span>
          <FaArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
