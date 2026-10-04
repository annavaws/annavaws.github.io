import React from "react";
import blogData from "@/components/modules/BlogModules/data.json";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

interface BlogPost {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
}

const posts: BlogPost[] = blogData.status === "ok" ? blogData.items : [];

const formatDate = (dateString: string) =>
  new Date(dateString.replace(" ", "T")).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const BlogPosts: React.FC = () => {
  return (
    <main className="relative min-h-screen pb-24 pt-36 md:pt-44">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal className="mb-12 md:mb-16">
          <h1 className="font-display text-[clamp(3rem,9vw,7rem)] font-black uppercase leading-[1] text-fg">
            Transmissions
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Notes on software engineering, published on Medium.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.guid} delay={(i % 2) * 0.08}>
              <TiltCard max={6} className="panel">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal"
                >
                  <p className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-muted">
                    <span>{formatDate(post.pubDate)}</span>
                    <span className="text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </p>
                  <h2 className="mt-4 flex-1 text-2xl font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-6 font-mono text-xs uppercase tracking-wider text-signal">
                    Read on Medium <span aria-hidden>↗</span>
                  </p>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogPosts;
