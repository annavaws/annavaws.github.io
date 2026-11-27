import React, { useEffect, useRef } from "react";
import { token } from "@/utils/tokens";

// Hero pond: a dotted water surface with koi.
// Click or tap the water: a ripple spreads and nearby fish dart away.
// Hold the cursor still: the fish slowly swim back and circle it.
// Moving the cursor leaves a light ripple trail.

type Fish = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  wander: number;
  len: number;
  phase: number;
  scared: number;
  accent: boolean;
};

type Ripple = { x: number; y: number; born: number; strength: number };

const DOT_GAP = 28;
const RIPPLE_SPEED = 220; // px per second
const RIPPLE_LIFE = 2.4; // seconds
const CRUISE = 46; // px per second
const PANIC = 340;
const FLEE_RADIUS = 280;
const IDLE_BEFORE_SEEK = 0.7; // seconds of stillness before fish approach
const HOVER_DIST = 70; // fish circle the cursor at about this distance

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function makeFish(w: number, h: number, accent: boolean): Fish {
  const angle = rand(0, Math.PI * 2);
  return {
    x: rand(0.1, 0.9) * w,
    y: rand(0.15, 0.9) * h,
    vx: Math.cos(angle) * CRUISE,
    vy: Math.sin(angle) * CRUISE,
    angle,
    wander: angle,
    len: rand(30, 46),
    phase: rand(0, Math.PI * 2),
    scared: 0,
    accent,
  };
}

export default function Pond({
  target,
  active,
  still,
}: {
  // Element that receives pointer input (the whole hero section)
  target: React.RefObject<HTMLElement>;
  // Pause the loop when the hero is off screen
  active: boolean;
  // Reduced motion: draw one calm frame and ignore input
  still: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = target.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = {
      dot: token("dot"),
      signal: (a: number) => token("signal", a),
      fg: token("fg", 0.6),
      fgFin: token("fg", 0.35),
      accent: token("accent", 0.9),
      accentFin: token("accent", 0.5),
    };

    let w = 0;
    let h = 0;
    let fish: Fish[] = [];
    const ripples: Ripple[] = [];
    const pointer = { x: 0, y: 0, inside: false, lastMove: 0, lastTrail: { x: 0, y: 0 } };
    let lastClick = -10;
    let now = 0;
    let raf = 0;
    let prev = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(12, Math.max(5, (w * h) / 110000)));
      if (fish.length !== count) {
        fish = Array.from({ length: count }, (_, i) => makeFish(w, h, i % 4 === 0));
      } else {
        fish.forEach((f) => {
          f.x = Math.min(f.x, w);
          f.y = Math.min(f.y, h);
        });
      }
      if (still) draw();
    };

    const local = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMove = (e: PointerEvent) => {
      const p = local(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.inside = true;
      pointer.lastMove = now;
      // Light trail: a faint ripple every ~60px of travel
      if (e.pointerType === "mouse" && Math.hypot(p.x - pointer.lastTrail.x, p.y - pointer.lastTrail.y) > 60) {
        pointer.lastTrail = p;
        addRipple(p.x, p.y, 0.35);
      }
    };

    const onLeave = () => {
      pointer.inside = false;
    };

    const onDown = (e: PointerEvent) => {
      // Clicks on links and buttons are not splashes
      if ((e.target as HTMLElement).closest("a, button")) return;
      const p = local(e);
      lastClick = now;
      addRipple(p.x, p.y, 1);
      for (const f of fish) {
        const dx = f.x - p.x;
        const dy = f.y - p.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < FLEE_RADIUS) {
          const push = PANIC * (1 - d / FLEE_RADIUS * 0.6);
          f.vx = (dx / d) * push;
          f.vy = (dy / d) * push;
          f.scared = 1.6;
        }
      }
    };

    function addRipple(x: number, y: number, strength: number) {
      ripples.push({ x, y, born: now, strength });
      if (ripples.length > 14) ripples.shift();
    }

    function update(dt: number) {
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].born > RIPPLE_LIFE) ripples.splice(i, 1);
      }

      const seeking =
        pointer.inside &&
        now - pointer.lastMove > IDLE_BEFORE_SEEK &&
        now - lastClick > 1.8;

      for (const f of fish) {
        f.scared = Math.max(0, f.scared - dt);
        let ax = 0;
        let ay = 0;

        if (seeking && f.scared === 0) {
          // Swim toward the cursor, then circle it instead of stacking on it
          const dx = pointer.x - f.x;
          const dy = pointer.y - f.y;
          const d = Math.hypot(dx, dy) || 1;
          const pull = d > HOVER_DIST ? 60 : -30;
          ax += (dx / d) * pull - (dy / d) * 28;
          ay += (dy / d) * pull + (dx / d) * 28;
        } else {
          f.wander += rand(-1.6, 1.6) * dt;
          ax += Math.cos(f.wander) * 30;
          ay += Math.sin(f.wander) * 30;
        }

        // Keep inside the pond with a soft margin
        const m = 60;
        if (f.x < m) ax += (m - f.x) * 2;
        if (f.x > w - m) ax -= (f.x - (w - m)) * 2;
        if (f.y < m) ay += (m - f.y) * 2;
        if (f.y > h - m) ay -= (f.y - (h - m)) * 2;

        // Personal space between fish
        for (const o of fish) {
          if (o === f) continue;
          const dx = f.x - o.x;
          const dy = f.y - o.y;
          const d = Math.hypot(dx, dy);
          if (d > 0 && d < 46) {
            ax += (dx / d) * (46 - d) * 3;
            ay += (dy / d) * (46 - d) * 3;
          }
        }

        f.vx += ax * dt;
        f.vy += ay * dt;

        // Panic speed decays back to cruising speed
        const speed = Math.hypot(f.vx, f.vy) || 1;
        const max = f.scared > 0 ? PANIC : seeking ? CRUISE * 1.4 : CRUISE;
        const next = speed > max ? speed + (max - speed) * Math.min(1, dt * 2.5) : Math.max(speed, CRUISE * 0.5);
        f.vx = (f.vx / speed) * next;
        f.vy = (f.vy / speed) * next;

        f.x += f.vx * dt;
        f.y += f.vy * dt;

        // Turn smoothly toward the direction of travel
        const want = Math.atan2(f.vy, f.vx);
        let diff = want - f.angle;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        f.angle += diff * Math.min(1, dt * 6);
        f.phase += dt * (4 + next / 30);
      }
    }

    function drawWater() {
      const t = now;
      const cols = Math.ceil(w / DOT_GAP) + 1;
      const rows = Math.ceil(h / DOT_GAP) + 1;
      ctx!.fillStyle = colors.dot;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * DOT_GAP + (r % 2 ? DOT_GAP / 2 : 0);
          const by = r * DOT_GAP;
          let ox = 0;
          let oy = 0;
          let lift = 0;
          for (const rp of ripples) {
            const age = t - rp.born;
            const radius = age * RIPPLE_SPEED;
            const dx = bx - rp.x;
            const dy = by - rp.y;
            const d = Math.hypot(dx, dy) || 1;
            const band = (d - radius) / 26;
            if (band > -3 && band < 3) {
              const k = Math.exp(-band * band) * rp.strength * (1 - age / RIPPLE_LIFE);
              ox += (dx / d) * k * 7;
              oy += (dy / d) * k * 7;
              lift += k;
            }
          }
          // Slow ambient shimmer so the surface never looks frozen
          const shimmer = still ? 0.5 : 0.5 + 0.5 * Math.sin(t * 0.8 + c * 0.45 + r * 0.3);
          ctx!.globalAlpha = Math.min(1, 0.18 + shimmer * 0.14 + lift * 0.6);
          ctx!.fillRect(bx + ox - 1, by + oy - 1, 2, 2);
        }
      }
      ctx!.globalAlpha = 1;

      // Thin rings on top of the dot displacement
      for (const rp of ripples) {
        const age = now - rp.born;
        const life = 1 - age / RIPPLE_LIFE;
        for (let i = 0; i < 2; i++) {
          const radius = age * RIPPLE_SPEED - i * 22;
          if (radius <= 0) continue;
          ctx!.strokeStyle = colors.signal(0.4 * life * rp.strength * (1 - i * 0.4));
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.ellipse(rp.x, rp.y, radius, radius * 0.92, 0, 0, Math.PI * 2);
          ctx!.stroke();
        }
      }
    }

    function drawFish(f: Fish) {
      const c = ctx!;
      const L = f.len;
      const sway = Math.sin(f.phase) * 0.28;
      c.save();
      c.translate(f.x, f.y);
      c.rotate(f.angle);

      // Spine bends more toward the tail
      const seg = 7;
      const pts: { x: number; y: number; r: number }[] = [];
      for (let i = 0; i <= seg; i++) {
        const u = i / seg;
        const x = L * 0.45 - u * L;
        const y = Math.sin(f.phase - u * 2.2) * sway * L * 0.22 * u;
        const r = L * 0.17 * Math.sin(Math.PI * Math.min(1, u * 1.15 + 0.08)) + 0.6;
        pts.push({ x, y, r });
      }

      // Tail fin
      const tail = pts[seg];
      const before = pts[seg - 1];
      const ta = Math.atan2(tail.y - before.y, tail.x - before.x);
      c.fillStyle = f.accent ? colors.accentFin : colors.fgFin;
      c.beginPath();
      c.moveTo(tail.x, tail.y);
      c.lineTo(tail.x + Math.cos(ta + 0.55) * L * 0.3, tail.y + Math.sin(ta + 0.55) * L * 0.3);
      c.lineTo(tail.x + Math.cos(ta) * L * 0.16, tail.y + Math.sin(ta) * L * 0.16);
      c.lineTo(tail.x + Math.cos(ta - 0.55) * L * 0.3, tail.y + Math.sin(ta - 0.55) * L * 0.3);
      c.closePath();
      c.fill();

      // Pectoral fins
      const fin = pts[2];
      const flap = Math.sin(f.phase * 0.7) * 0.25;
      for (const side of [1, -1]) {
        c.beginPath();
        c.moveTo(fin.x, fin.y + side * fin.r * 0.8);
        c.lineTo(fin.x - L * 0.2, fin.y + side * (fin.r + L * (0.2 + flap * side)));
        c.lineTo(fin.x - L * 0.12, fin.y + side * fin.r * 0.6);
        c.closePath();
        c.fill();
      }

      // Body outline from both sides of the spine
      c.fillStyle = f.accent ? colors.accent : colors.fg;
      c.beginPath();
      pts.forEach((p, i) => (i === 0 ? c.moveTo(p.x + p.r, p.y) : c.lineTo(p.x, p.y - p.r)));
      for (let i = pts.length - 1; i >= 0; i--) c.lineTo(pts[i].x, pts[i].y + pts[i].r);
      c.closePath();
      c.fill();

      c.restore();
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      drawWater();
      fish.forEach(drawFish);
    }

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (time - prev) / 1000);
      prev = time;
      if (!activeRef.current || document.hidden) return;
      now += dt;
      update(dt);
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (still) {
      draw();
      return () => ro.disconnect();
    }

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, [target, still]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
