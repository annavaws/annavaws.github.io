import { useReducedMotion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { skills } from "@/data/content";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { cn } from "@/utils/cn";

type Tag = { text: string; group: string };

// Skills spread over a sphere that spins toward the pointer
function SkillSphere({ activeGroup }: { activeGroup: string | null }) {
  const reduce = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);

  const tags = useMemo<Tag[]>(
    () => skills.flatMap((s) => s.items.map((text) => ({ text, group: s.group }))),
    []
  );

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const golden = Math.PI * (3 - Math.sqrt(5));
    const points = tags.map((_, i) => {
      const y = 1 - (i / (tags.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return { x: Math.cos(golden * i) * r, y, z: Math.sin(golden * i) * r };
    });

    const idle = { x: 0.0035, y: 0.0012 };
    const target = { ...idle };
    const velocity = { ...idle };
    let raf = 0;
    let running = false;

    const draw = () => {
      const radius = el.clientWidth / 2 - 40;
      points.forEach((p, i) => {
        const node = nodes.current[i];
        if (!node) return;
        const depth = (p.z + 1) / 2; // 0 = back, 1 = front
        const scale = 0.6 + depth * 0.6;
        node.style.transform = `translate(-50%, -50%) translate3d(${p.x * radius}px, ${p.y * radius}px, 0) scale(${scale})`;
        node.style.opacity = String(0.2 + depth * 0.8);
        node.style.zIndex = String(Math.round(depth * 100));
      });
    };

    const tick = () => {
      velocity.x += (target.x - velocity.x) * 0.06;
      velocity.y += (target.y - velocity.y) * 0.06;
      const cy = Math.cos(velocity.x);
      const sy = Math.sin(velocity.x);
      const cx = Math.cos(velocity.y);
      const sx = Math.sin(velocity.y);
      for (const p of points) {
        const x = p.x * cy + p.z * sy;
        const z = -p.x * sy + p.z * cy;
        const y = p.y * cx - z * sx;
        p.z = p.y * sx + z * cx;
        p.x = x;
        p.y = y;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    draw();
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 0.05;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * -0.05;
    };
    const onLeave = () => {
      target.x = idle.x;
      target.y = idle.y;
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    // Only animate while on screen
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);
    window.addEventListener("resize", draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", draw);
    };
  }, [tags, reduce]);

  return (
    <div
      ref={container}
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-[520px] select-none"
    >
      {tags.map((tag, i) => (
        <span
          key={tag.text}
          ref={(n) => {
            nodes.current[i] = n;
          }}
          className={cn(
            "absolute left-1/2 top-1/2 whitespace-nowrap font-mono text-sm transition-colors duration-300 will-change-transform",
            activeGroup === null
              ? "text-fg"
              : activeGroup === tag.group
              ? "text-accent"
              : "text-muted/40"
          )}
        >
          {tag.text}
        </span>
      ))}
    </div>
  );
}

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading title="Payload manifest" />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SkillSphere activeGroup={activeGroup} />
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-line border-y border-line">
              {skills.map((s) => (
                <div
                  key={s.group}
                  onPointerEnter={() => setActiveGroup(s.group)}
                  onPointerLeave={() => setActiveGroup(null)}
                  className="group grid gap-2 py-5 transition-colors sm:grid-cols-[150px_1fr]"
                >
                  <dt className="label transition-colors group-hover:!text-accent">
                    {s.group}
                  </dt>
                  <dd className="leading-relaxed text-muted transition-colors group-hover:text-fg">
                    {s.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted">
              Practices: AI-assisted development (Claude Code), technical
              documentation, Agile delivery, Git.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
