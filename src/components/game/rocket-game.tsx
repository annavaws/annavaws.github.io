import React, { useCallback, useEffect, useRef, useState } from "react";

type Phase = "idle" | "playing" | "over";
type Item = {
  x: number;
  y: number;
  r: number;
  hazard: boolean;
  label: string;
  phase: number;
};
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

const TOKENS = [
  "NestJS",
  "Postgres",
  "Redis",
  "Next.js",
  "React",
  "Prisma",
  "Shopify",
  "Python",
  "eSIM",
  "Tests",
];
const HAZARDS = ["502", "RACE", "BUG", "NULL", "LEAK", "TIMEOUT"];
const COLORS = {
  ink: "#070B14",
  fg: "#E8ECF4",
  accent: "#FF7A1A",
  signal: "#5CE1E6",
  danger: "#FF4D5E",
};
const MAX_LIVES = 3;
const BEST_KEY = "rocket-courier-best";

function pill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x - w / 2 + r, y - r);
  ctx.arcTo(x + w / 2, y - r, x + w / 2, y + r, r);
  ctx.arcTo(x + w / 2, y + r, x - w / 2, y + r, r);
  ctx.arcTo(x - w / 2, y + r, x - w / 2, y - r, r);
  ctx.arcTo(x - w / 2, y - r, x + w / 2, y - r, r);
  ctx.closePath();
}

export default function RocketGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [best, setBest] = useState(0);
  const [newBest, setNewBest] = useState(false);

  // Mutable game state lives outside React so the loop never re-renders
  const game = useRef({
    phase: "idle" as Phase,
    w: 0,
    h: 0,
    rocket: { x: 0, y: 0, tx: 0, ty: 0 },
    items: [] as Item[],
    particles: [] as Particle[],
    stars: [] as { x: number; y: number; z: number }[],
    keys: new Set<string>(),
    elapsed: 0,
    spawnIn: 0,
    score: 0,
    lives: MAX_LIVES,
    invulnerable: 0,
    shake: 0,
    best: 0,
  });

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(BEST_KEY)) || 0;
      game.current.best = stored;
      setBest(stored);
    } catch {
      // Storage unavailable: best score just won't persist
    }
  }, []);

  const start = useCallback(() => {
    const g = game.current;
    g.items = [];
    g.particles = [];
    g.elapsed = 0;
    g.spawnIn = 0.6;
    g.score = 0;
    g.lives = MAX_LIVES;
    g.invulnerable = 0;
    g.rocket.x = g.rocket.tx = g.w * 0.2;
    g.rocket.y = g.rocket.ty = g.h / 2;
    g.keys.clear();
    g.phase = "playing";
    setScore(0);
    setLives(MAX_LIVES);
    setNewBest(false);
    setPhase("playing");
    canvasRef.current?.focus({ preventScroll: true });
  }, []);

  const end = useCallback((toIdle = false) => {
    const g = game.current;
    g.phase = toIdle ? "idle" : "over";
    const finalScore = Math.floor(g.score);
    if (!toIdle && finalScore > g.best) {
      g.best = finalScore;
      setBest(finalScore);
      setNewBest(true);
      try {
        localStorage.setItem(BEST_KEY, String(finalScore));
      } catch {
        // ignore
      }
    }
    setScore(finalScore);
    setPhase(g.phase);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;
    const g = game.current;
    const fontFamily = getComputedStyle(canvas).fontFamily;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      g.w = wrap.clientWidth;
      g.h = wrap.clientHeight;
      canvas.width = g.w * dpr;
      canvas.height = g.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.stars = Array.from({ length: 90 }, () => ({
        x: Math.random() * g.w,
        y: Math.random() * g.h,
        z: 0.2 + Math.random() * 0.8,
      }));
      if (g.phase !== "playing") {
        g.rocket.x = g.rocket.tx = g.w * 0.2;
        g.rocket.y = g.rocket.ty = g.h / 2;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const burst = (x: number, y: number, color: string, count: number) => {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 60 + Math.random() * 220;
        g.particles.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: 0.4 + Math.random() * 0.4,
          color,
        });
      }
    };

    const update = (dt: number) => {
      const scale = Math.min(Math.max(g.w / 900, 0.6), 1);
      const playing = g.phase === "playing";
      const speed = (playing ? Math.min(240 + g.elapsed * 7, 560) : 120) * scale;

      for (const s of g.stars) {
        s.x -= speed * s.z * 0.35 * dt;
        if (s.x < 0) {
          s.x = g.w;
          s.y = Math.random() * g.h;
        }
      }

      for (const p of g.particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
      }
      g.particles = g.particles.filter((p) => p.life > 0);
      g.shake = Math.max(0, g.shake - dt * 3);

      const rocket = g.rocket;
      if (!playing) {
        // Attract mode: rocket bobs in place
        rocket.ty = g.h / 2 + Math.sin(performance.now() / 600) * 14;
        rocket.y += (rocket.ty - rocket.y) * Math.min(1, dt * 6);
        return;
      }

      g.elapsed += dt;
      g.score += dt * 2;
      g.invulnerable = Math.max(0, g.invulnerable - dt);

      const keySpeed = 520 * scale;
      if (g.keys.has("up")) rocket.ty -= keySpeed * dt;
      if (g.keys.has("down")) rocket.ty += keySpeed * dt;
      if (g.keys.has("left")) rocket.tx -= keySpeed * dt;
      if (g.keys.has("right")) rocket.tx += keySpeed * dt;
      rocket.tx = Math.min(Math.max(rocket.tx, 30), g.w - 30);
      rocket.ty = Math.min(Math.max(rocket.ty, 30), g.h - 30);
      rocket.x += (rocket.tx - rocket.x) * Math.min(1, dt * 12);
      rocket.y += (rocket.ty - rocket.y) * Math.min(1, dt * 12);

      // Exhaust
      g.particles.push({
        x: rocket.x - 20,
        y: rocket.y + (Math.random() - 0.5) * 6,
        vx: -speed * 0.6 - Math.random() * 60,
        vy: (Math.random() - 0.5) * 40,
        life: 0.25 + Math.random() * 0.2,
        color: COLORS.accent,
      });

      g.spawnIn -= dt;
      if (g.spawnIn <= 0) {
        g.spawnIn = Math.max(0.32, 0.85 - g.elapsed * 0.012) / scale;
        const hazard = Math.random() < Math.min(0.35 + g.elapsed * 0.006, 0.6);
        const list = hazard ? HAZARDS : TOKENS;
        g.items.push({
          x: g.w + 60,
          y: 40 + Math.random() * (g.h - 80),
          r: hazard ? 20 : 26,
          hazard,
          label: list[Math.floor(Math.random() * list.length)],
          phase: Math.random() * Math.PI * 2,
        });
      }

      for (const item of g.items) {
        item.x -= speed * dt;
        item.y += Math.sin(g.elapsed * 2 + item.phase) * 18 * dt;
      }

      g.items = g.items.filter((item) => {
        if (item.x < -80) return false;
        const hit =
          Math.hypot(item.x - rocket.x, item.y - rocket.y) < item.r + 14;
        if (!hit) return true;
        if (!item.hazard) {
          g.score += 10;
          burst(item.x, item.y, COLORS.signal, 14);
          return false;
        }
        if (g.invulnerable > 0) return true;
        g.lives -= 1;
        g.invulnerable = 1.4;
        g.shake = 1;
        burst(rocket.x, rocket.y, COLORS.danger, 26);
        setLives(g.lives);
        if (g.lives <= 0) end();
        return false;
      });

      setScore(Math.floor(g.score));
    };

    const drawRocket = (x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);
      // Flame
      const flame = 12 + Math.random() * 8;
      ctx.fillStyle = COLORS.accent;
      ctx.beginPath();
      ctx.moveTo(-16, -5);
      ctx.lineTo(-16 - flame, 0);
      ctx.lineTo(-16, 5);
      ctx.closePath();
      ctx.fill();
      // Fins
      ctx.fillStyle = COLORS.accent;
      ctx.beginPath();
      ctx.moveTo(-14, -8);
      ctx.lineTo(-22, -17);
      ctx.lineTo(-2, -9);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-14, 8);
      ctx.lineTo(-22, 17);
      ctx.lineTo(-2, 9);
      ctx.closePath();
      ctx.fill();
      // Body
      ctx.fillStyle = COLORS.fg;
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.quadraticCurveTo(8, -12, -16, -9);
      ctx.lineTo(-16, 9);
      ctx.quadraticCurveTo(8, 12, 24, 0);
      ctx.closePath();
      ctx.fill();
      // Window
      ctx.fillStyle = COLORS.ink;
      ctx.beginPath();
      ctx.arc(4, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = COLORS.signal;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.save();
      ctx.clearRect(0, 0, g.w, g.h);
      if (g.shake > 0) {
        ctx.translate(
          (Math.random() - 0.5) * 10 * g.shake,
          (Math.random() - 0.5) * 10 * g.shake
        );
      }

      for (const s of g.stars) {
        ctx.globalAlpha = 0.25 + s.z * 0.6;
        ctx.fillStyle = COLORS.fg;
        ctx.fillRect(s.x, s.y, s.z * 2, s.z * 2);
      }
      ctx.globalAlpha = 1;

      ctx.font = `500 12px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (const item of g.items) {
        const color = item.hazard ? COLORS.danger : COLORS.signal;
        const width = ctx.measureText(item.label).width + 22;
        pill(ctx, item.x, item.y, width, 26);
        ctx.fillStyle = item.hazard ? "rgba(255,77,94,0.16)" : "rgba(92,225,230,0.12)";
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fillText(item.label, item.x, item.y + 1);
      }

      for (const p of g.particles) {
        ctx.globalAlpha = Math.min(1, p.life * 2.5);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
      }
      ctx.globalAlpha = 1;

      // Blink while invulnerable
      const blink =
        g.invulnerable > 0 && Math.floor(g.invulnerable * 12) % 2 === 0;
      if (g.phase !== "over" && !blink) drawRocket(g.rocket.x, g.rocket.y);
      ctx.restore();
    };

    let raf = 0;
    let last = 0;
    let onScreen = false;
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(dt);
      draw();
      raf = requestAnimationFrame(loop);
    };
    const setRunning = (run: boolean) => {
      cancelAnimationFrame(raf);
      if (run) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    // Pause whenever the game is off screen or the tab is hidden
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      setRunning(onScreen && !document.hidden);
    });
    io.observe(wrap);
    const onVisibility = () => setRunning(onScreen && !document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    const onPointer = (e: PointerEvent) => {
      if (g.phase !== "playing") return;
      const rect = canvas.getBoundingClientRect();
      g.rocket.tx = e.clientX - rect.left;
      g.rocket.ty = e.clientY - rect.top;
    };
    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerdown", onPointer);

    const keyMap: Record<string, string> = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      w: "up",
      s: "down",
      a: "left",
      d: "right",
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (g.phase !== "playing" || !onScreen) return;
      if (e.key === "Escape") {
        end(true);
        return;
      }
      const dir = keyMap[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (dir) {
        g.keys.add(dir);
        // Keep arrow keys from scrolling the page mid-game
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const dir = keyMap[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (dir) g.keys.delete(dir);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [end]);

  return (
    <div
      ref={wrapRef}
      className="panel relative h-[min(70vh,560px)] min-h-[420px] overflow-hidden !bg-ink"
    >
      <canvas
        ref={canvasRef}
        tabIndex={-1}
        aria-label="Rocket Courier game canvas"
        className="absolute inset-0 h-full w-full font-mono outline-none"
        style={{
          touchAction: phase === "playing" ? "none" : "auto",
          cursor: phase === "playing" ? "none" : "default",
        }}
      />

      {/* HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 font-mono text-xs uppercase tracking-wider">
        <div>
          <p className="text-muted">Score</p>
          <p className="text-2xl tabular-nums text-fg" aria-live="off">
            {String(score).padStart(4, "0")}
          </p>
        </div>
        <div className="text-center">
          <p className="text-muted">Shields</p>
          <p className="mt-1 flex gap-1.5" aria-label={`${lives} shields left`}>
            {Array.from({ length: MAX_LIVES }, (_, i) => (
              <span
                key={i}
                className={`h-2.5 w-6 rounded-sm ${
                  i < lives ? "bg-accent" : "bg-line"
                }`}
              />
            ))}
          </p>
        </div>
        <div className="text-right">
          <p className="text-muted">Best</p>
          <p className="text-2xl tabular-nums text-signal">
            {String(best).padStart(4, "0")}
          </p>
        </div>
      </div>

      {phase !== "playing" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/70 px-6 text-center backdrop-blur-[2px]">
          {phase === "over" ? (
            <>
              <p className="label !text-danger">Signal lost</p>
              <p className="mt-3 font-display text-6xl font-black uppercase text-fg md:text-7xl">
                {score} pts
              </p>
              <p className="mt-2 font-mono text-sm text-muted">
                {newBest ? "New personal best. Payload delivered." : `Best: ${best}`}
              </p>
            </>
          ) : (
            <>
              <p className="label">Mini game</p>
              <p className="mt-3 font-display text-5xl font-black uppercase text-fg md:text-7xl">
                Rocket Courier
              </p>
              <p className="mt-3 max-w-md text-muted">
                Collect the <span className="text-signal">stack tokens</span>,
                dodge the <span className="text-danger">502s and race conditions</span>.
                Three shields. It gets faster.
              </p>
            </>
          )}
          <button onClick={start} className="btn-primary mt-7">
            {phase === "over" ? "Fly again" : "Launch"}
          </button>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-muted">
            Mouse or touch to steer · WASD / arrows · Esc to quit
          </p>
        </div>
      )}
    </div>
  );
}
