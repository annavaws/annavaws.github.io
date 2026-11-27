import React from "react";
import { profile } from "@/data/content";

const Footer = () => {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-8 font-mono text-xs uppercase tracking-wider text-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="flex items-center gap-5">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
        </span>
        <a href="#" className="hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
