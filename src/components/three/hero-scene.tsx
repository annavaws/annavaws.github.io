import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { token } from "@/utils/tokens";

const GLOBE_R = 2;

// Deterministic PRNG so the globe looks the same on every visit
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fibonacciSphere(count: number, radius: number) {
  const pts = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts[i * 3] = Math.cos(theta) * r * radius;
    pts[i * 3 + 1] = y * radius;
    pts[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return pts;
}

const rimVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const rimFragment = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float f = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.6);
    gl_FragColor = vec4(uColor, f * 0.85);
  }
`;

function Globe() {
  const group = useRef<THREE.Group>(null);
  const hubs = useRef<THREE.PointsMaterial>(null);
  const packets = useRef<(THREE.Mesh | null)[]>([]);

  const { surface, hubPositions, routes } = useMemo(() => {
    const rand = mulberry32(66);
    const surface = fibonacciSphere(2600, GLOBE_R);

    // Destinations: random points on the sphere
    const hubVecs: THREE.Vector3[] = [];
    for (let i = 0; i < 18; i++) {
      const u = rand() * 2 - 1;
      const phi = rand() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      hubVecs.push(
        new THREE.Vector3(Math.cos(phi) * r, u, Math.sin(phi) * r).multiplyScalar(
          GLOBE_R + 0.01
        )
      );
    }
    const hubPositions = new Float32Array(hubVecs.flatMap((v) => [v.x, v.y, v.z]));

    // Delivery routes: arcs between destinations
    const material = new THREE.LineBasicMaterial({
      color: token("accent"),
      transparent: true,
      opacity: 0.45,
    });
    const routes = Array.from({ length: 12 }, (_, i) => {
      const a = hubVecs[i % hubVecs.length];
      const b = hubVecs[(i * 5 + 3) % hubVecs.length];
      const mid = a
        .clone()
        .add(b)
        .normalize()
        .multiplyScalar(GLOBE_R + a.distanceTo(b) * 0.4);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const geometry = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(48)
      );
      return {
        curve,
        line: new THREE.Line(geometry, material),
        speed: 0.12 + rand() * 0.14,
        offset: rand(),
      };
    });
    return { surface, hubPositions, routes };
  }, []);

  useEffect(
    () => () => {
      routes.forEach((r) => r.line.geometry.dispose());
      (routes[0]?.line.material as THREE.Material | undefined)?.dispose();
    },
    [routes]
  );

  const rimUniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color(token("signal")) } }),
    []
  );

  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.07;
    const t = state.clock.elapsedTime;
    if (hubs.current) hubs.current.size = 0.075 + Math.sin(t * 2.2) * 0.02;
    routes.forEach((route, i) => {
      const mesh = packets.current[i];
      if (mesh) {
        mesh.position.copy(
          route.curve.getPoint((t * route.speed + route.offset) % 1)
        );
      }
    });
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0.18]}>
      {/* Dark core hides the far side of the dot shell */}
      <mesh>
        <sphereGeometry args={[GLOBE_R - 0.02, 48, 48]} />
        <meshBasicMaterial color={token("ink")} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[surface, 3]} />
        </bufferGeometry>
        <pointsMaterial color={token("dot")} size={0.024} sizeAttenuation />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[hubPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={hubs}
          color={token("accent")}
          size={0.075}
          sizeAttenuation
        />
      </points>
      {routes.map((route, i) => (
        <React.Fragment key={i}>
          <primitive object={route.line} />
          <mesh
            ref={(m) => {
              packets.current[i] = m;
            }}
          >
            <sphereGeometry args={[0.028, 8, 8]} />
            <meshBasicMaterial color={token("fg")} />
          </mesh>
        </React.Fragment>
      ))}
      {/* Atmosphere rim */}
      <mesh>
        <sphereGeometry args={[GLOBE_R + 0.03, 48, 48]} />
        <shaderMaterial
          vertexShader={rimVertex}
          fragmentShader={rimFragment}
          uniforms={rimUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function OrbitRing({
  radius,
  tilt,
  speed,
  phase,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  phase: number;
}) {
  const sat = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const a = state.clock.elapsedTime * speed + phase;
    if (sat.current) {
      sat.current.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
      sat.current.rotation.x = a * 2;
      sat.current.rotation.y = a * 1.3;
    }
  });
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.004, 6, 180]} />
        <meshBasicMaterial color={token("signal")} transparent opacity={0.35} />
      </mesh>
      <mesh ref={sat}>
        <octahedronGeometry args={[0.09, 0]} />
        <meshBasicMaterial color={token("accent")} wireframe />
      </mesh>
    </group>
  );
}

function Stars() {
  const positions = useMemo(() => {
    const rand = mulberry32(2026);
    const pts = new Float32Array(1600 * 3);
    for (let i = 0; i < 1600; i++) {
      const u = rand() * 2 - 1;
      const phi = rand() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      const dist = 26 + rand() * 30;
      pts[i * 3] = Math.cos(phi) * r * dist;
      pts[i * 3 + 1] = u * dist;
      pts[i * 3 + 2] = Math.sin(phi) * r * dist;
    }
    return pts;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.006;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={token("fg")}
        size={0.09}
        sizeAttenuation
        transparent
        opacity={0.75}
      />
    </points>
  );
}

// Moves the planet with the pointer and scroll position, and lets the
// visitor drag anywhere in the hero to spin it
function Rig({ children }: { children: React.ReactNode }) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const drag = useRef({ active: false, x: 0, y: 0, vx: 0, vy: 0 });
  const width = useThree((s) => s.size.width);
  const wide = width >= 900;

  useEffect(() => {
    const d = drag.current;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      if (d.active) {
        d.vx = (e.clientX - d.x) * 0.005;
        d.vy = (e.clientY - d.y) * 0.005;
        d.x = e.clientX;
        d.y = e.clientY;
      }
    };
    const onDown = (e: PointerEvent) => {
      // Touch is left alone so the page still scrolls
      if (e.pointerType === "touch") return;
      const target = e.target as HTMLElement;
      if (!target.closest("#top") || target.closest("a, button")) return;
      d.active = true;
      d.x = e.clientX;
      d.y = e.clientY;
      document.body.style.userSelect = "none";
    };
    const onUp = () => {
      d.active = false;
      document.body.style.userSelect = "";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.body.style.userSelect = "";
    };
  }, []);

  useFrame((_, delta) => {
    const k = 1 - Math.exp(-delta * 3);
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    const d = drag.current;
    if (spin.current) {
      spin.current.rotation.y += d.vx;
      spin.current.rotation.x = THREE.MathUtils.clamp(
        spin.current.rotation.x + d.vy,
        -0.9,
        0.9
      );
      // Inertia after release; while held, motion stops when the pointer does
      const friction = d.active ? 0.6 : 0.95;
      d.vx *= friction;
      d.vy *= friction;
    }
    if (inner.current) {
      inner.current.rotation.y +=
        (pointer.current.x * 0.35 - inner.current.rotation.y) * k;
      inner.current.rotation.x +=
        (pointer.current.y * 0.22 - inner.current.rotation.x) * k;
    }
    if (outer.current) {
      const baseX = wide ? 3 : 0;
      const baseY = wide ? -0.1 : -2.3;
      const scale = (wide ? 1 : 0.72) * (1 + scroll * 0.35);
      outer.current.position.x += (baseX - outer.current.position.x) * k;
      outer.current.position.y +=
        (baseY + scroll * 1.6 - outer.current.position.y) * k;
      outer.current.scale.setScalar(
        outer.current.scale.x + (scale - outer.current.scale.x) * k
      );
    }
  });

  return (
    <group ref={outer} position={[wide ? 3 : 0, wide ? -0.1 : -2.3, 0]}>
      <group ref={inner}>
        <group ref={spin}>{children}</group>
      </group>
    </group>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      style={{ pointerEvents: "none" }}
    >
      <Stars />
      <Rig>
        <Globe />
        <OrbitRing radius={2.9} tilt={[1.25, 0.2, 0]} speed={0.35} phase={0} />
        <OrbitRing radius={3.5} tilt={[1.0, -0.5, 0.3]} speed={-0.22} phase={2} />
      </Rig>
    </Canvas>
  );
}
