import React from "react";
import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { profile } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-44">
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <p className="label mb-4">
            <span className="text-accent">06</span> / Contact
          </p>
          <h2 className="font-display text-[clamp(3rem,10vw,8.5rem)] font-black uppercase leading-[1] text-fg">
            Let&apos;s work
            <br />
            together
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            Based in {profile.location} and open to remote work. Whether you
            have a project in mind or just want to connect, reach out.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              <EnvelopeSimple weight="fill" aria-hidden /> {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <LinkedinLogo weight="fill" aria-hidden /> LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <GithubLogo weight="fill" aria-hidden /> GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
