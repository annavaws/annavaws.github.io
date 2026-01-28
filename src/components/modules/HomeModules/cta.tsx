import React from "react";
import { albert } from "@/styles/fonts";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const CTA = () => {
  const contactLinks = [
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/annava-ws/",
      primary: true,
    },
    {
      icon: FaEnvelope,
      label: "Email Me",
      href: "mailto:annavaws@gmail.com",
      primary: true,
    },
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/annavaws",
      primary: false,
    },
  ];

  return (
    <div
      className={`${albert.className} bg-gradient-radial from-gray-900 to-black py-20 px-5`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-slate-200 mb-2">
          Let&apos;s Work Together
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Based in Indonesia | Open to Remote Work
        </p>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          I&apos;m always open to new opportunities. Whether you have a
          project in mind or just want to connect, feel free to reach out!
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {contactLinks
            .filter((link) => link.primary)
            .map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </motion.a>
            ))}
        </div>

        <div className="flex justify-center gap-6">
          {contactLinks
            .filter((link) => !link.primary)
            .map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 border border-gray-600 hover:border-purple-500 text-gray-300 hover:text-purple-400 rounded-full transition-all duration-300"
              >
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </motion.a>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CTA;
