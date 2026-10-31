"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

// A stippled, grainy look: each pixel randomly picks between the lit and
// shaded color based on how much it faces the light, which gives a speckled
// texture instead of a smooth gradient. Colors are from the palette in globals.css.
const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uShade;
  uniform vec3 uLight;
  uniform float uBias;
  varying vec3 vNormal;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    float d = dot(normalize(vNormal), normalize(uLight)) * 0.5 + 0.5;
    float n = hash(gl_FragCoord.xy);
    float lit = smoothstep(0.3, 0.8, d + uBias + (n - 0.5) * 0.6);
    gl_FragColor = vec4(mix(uShade, uColor, lit), 1.0);
    #include <colorspace_fragment>
  }
`;

function makeMaterial(color: string, shade: string, bias: number) {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uShade: { value: new THREE.Color(shade) },
      uLight: { value: new THREE.Vector3(-0.6, 0.8, 0.7) },
      uBias: { value: bias },
    },
  });
}

type Kind = "pink" | "teal" | "dark";
type Shape =
  | "box"
  | "torus"
  | "cone"
  | "octahedron"
  | "icosahedron"
  | "tetrahedron";

// [lit colour, shaded colour, bias] for each shape colour, per theme
const PALETTES = {
  dark: {
    pink: ["#da7b93", "#2e151b", 0],
    teal: ["#8dbcbc", "#1c3334", 0],
    dark: ["#376e6f", "#1c3334", -0.25],
  },
  light: {
    pink: ["#e8d3cc", "#a97a72", 0],
    teal: ["#d6dfd9", "#7d958e", 0],
    dark: ["#b7c2bf", "#5f7a74", -0.2],
  },
} as const;

type Item = {
  shape: Shape;
  pos: [number, number, number];
  rot: [number, number, number];
  size: number;
  kind: Kind;
  spin: [number, number, number]; // rotation speed per axis
  bob: number; // bobbing speed
  phase: number;
};

// ---- Tweak these ----------------------------------------------------------
const PARALLAX = 0.6; // shapes scroll at 60% of page speed (1 = stuck to the page)
const ROW_GAP = 6; // vertical distance between rows of shapes, in world units
const SIZE_MIN = 0.45;
const SIZE_MAX = 1.25;
const SHAPES: Shape[] = [
  "box",
  "torus",
  "cone",
  "octahedron",
  "icosahedron",
  "tetrahedron",
];
const KINDS: Kind[] = ["pink", "teal", "dark", "teal", "pink"];
// ---------------------------------------------------------------------------

// Small seeded random generator so the layout is the same on every load.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Scatters shapes in rows from the top of the page down to `depth` world units.
function buildItems(halfW: number, depth: number): Item[] {
  const rand = mulberry32(7);
  const wide = halfW > 3.5;
  const perRow = wide ? 2 : 1;
  const rows = Math.max(3, Math.ceil(depth / ROW_GAP));

  // One large shape anchored beside the hero text.
  const anchor: Item = {
    shape: "icosahedron",
    pos: [wide ? halfW * 0.5 : 0, 0.2, 0],
    rot: [0.3, 0.4, 0],
    size: wide ? 1.7 : 1.2,
    kind: "teal",
    spin: [0.2, 0.35, 0],
    bob: 0.5,
    phase: 0,
  };
  const items: Item[] = [anchor];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < perRow; c++) {
      const slotW = (halfW * 2) / perRow;
      const x = -halfW + slotW * (c + 0.1 + 0.8 * rand());
      const y = 3 - r * ROW_GAP - rand() * 1.2;
      const z = -1.5 + rand() * 2.5;

      // Keep clear of the hero anchor.
      if (Math.hypot(x - anchor.pos[0], y - anchor.pos[1]) < 2.4) continue;

      items.push({
        shape: SHAPES[Math.floor(rand() * SHAPES.length)],
        pos: [x, y, z],
        rot: [rand() * Math.PI, rand() * Math.PI, rand() * Math.PI],
        size: SIZE_MIN + rand() * (SIZE_MAX - SIZE_MIN),
        kind: KINDS[Math.floor(rand() * KINDS.length)],
        spin: [0.15 + rand() * 0.35, 0.15 + rand() * 0.35, 0.05 + rand() * 0.25],
        bob: 0.4 + rand() * 0.5,
        phase: rand() * Math.PI * 2,
      });
    }
  }
  return items;
}

function Geometry({ shape, size }: { shape: Shape; size: number }) {
  switch (shape) {
    case "box":
      return <boxGeometry args={[size, size, size]} />;
    case "torus":
      return <torusGeometry args={[size * 0.7, size * 0.28, 24, 64]} />;
    case "cone":
      return <coneGeometry args={[size * 0.75, size * 1.6, 32]} />;
    case "octahedron":
      return <octahedronGeometry args={[size, 0]} />;
    case "icosahedron":
      return <icosahedronGeometry args={[size, 0]} />;
    case "tetrahedron":
      return <tetrahedronGeometry args={[size, 0]} />;
  }
}

function Shapes({ spin, maxScroll }: { spin: number; maxScroll: number }) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const height = useThree((s) => s.size.height);
  const halfW = useThree((s) => s.viewport.width) / 2;

  // World units per screen pixel at z = 0, so scroll distance maps to camera travel.
  const unitPerPx =
    (2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / height;

  const items = useMemo(
    () => buildItems(halfW, (maxScroll * PARALLAX + height) * unitPerPx),
    [halfW, maxScroll, height, unitPerPx]
  );

  const mats = useMemo(
    () => ({
      pink: makeMaterial("#da7b93", "#2e151b", -0.25),
      teal: makeMaterial("#8dbcbc", "#1c3334", -0.25),
      dark: makeMaterial("#376e6f", "#1c3334", -0.5),
    }),
    []
  );

  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  const theme = useTheme();

  // Recolour the shapes when the theme changes
  useEffect(() => {
    (Object.keys(mats) as Kind[]).forEach((k) => {
      const [color, shade, bias] = PALETTES[theme][k];
      mats[k].uniforms.uColor.value.set(color);
      mats[k].uniforms.uShade.value.set(shade);
      mats[k].uniforms.uBias.value = bias;
    });
  }, [theme, mats]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    // Camera follows the page scroll (slower, for parallax) and drifts with the pointer.
    const cam = state.camera;
    cam.position.y = THREE.MathUtils.damp(
      cam.position.y,
      -window.scrollY * unitPerPx * PARALLAX,
      6,
      dt
    );
    cam.position.x = THREE.MathUtils.damp(cam.position.x, state.pointer.x * 0.4 * spin, 2.5, dt);

    // Each shape turns on its own axes and bobs gently. With spin = 0
    // (reduced motion) the shapes stay still.
    items.forEach((it, i) => {
      const m = meshes.current[i];
      if (!m) return;
      m.rotation.x += dt * it.spin[0] * spin;
      m.rotation.y += dt * it.spin[1] * spin;
      m.rotation.z += dt * it.spin[2] * spin;
      m.position.y = it.pos[1] + Math.sin(t * it.bob + it.phase) * 0.25 * spin;
    });
  });

  return (
    <>
      {items.map((it, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          position={it.pos}
          rotation={it.rot}
          material={mats[it.kind]}
        >
          <Geometry shape={it.shape} size={it.size} />
        </mesh>
      ))}
    </>
  );
}

export default function BackgroundScene() {
  // spin = 0 freezes the animation for people who prefer reduced motion.
  const [spin, setSpin] = useState(1);
  // How far the page can scroll (px). Rounded so small layout shifts don't rebuild the scene.
  const [maxScroll, setMaxScroll] = useState(2000);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSpin(mq.matches ? 0 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setMaxScroll(Math.max(0, Math.round(max / 200) * 200));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <Canvas
      dpr={1}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      // The canvas sits behind the page content, so listen for the pointer on <body>.
      eventSource={document.body}
      eventPrefix="client"
    >
      <Shapes spin={spin} maxScroll={maxScroll} />
    </Canvas>
  );
}
