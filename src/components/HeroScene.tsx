"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

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
  | "tetrahedron"
  | "knot";

type Item = {
  shape: Shape;
  pos: [number, number, number];
  size: number;
  kind: Kind;
  spin: [number, number, number]; // rotation speed per axis
  bob: number; // bobbing speed
  phase: number;
};

// Edit this list to add, remove or move shapes.
const ITEMS: Item[] = [
  { shape: "icosahedron", pos: [0, 0.1, 0], size: 1.5, kind: "teal", spin: [0.2, 0.35, 0], bob: 0.5, phase: 0 },
  { shape: "box", pos: [-2.4, 1.6, -0.4], size: 1.0, kind: "pink", spin: [0.4, 0.3, 0.1], bob: 0.7, phase: 1.2 },
  { shape: "torus", pos: [2.5, 1.5, 0.2], size: 0.9, kind: "dark", spin: [0.5, 0.2, 0.3], bob: 0.6, phase: 2.1 },
  { shape: "cone", pos: [2.2, -1.7, 0.5], size: 1.0, kind: "pink", spin: [0.1, 0.4, 0.25], bob: 0.45, phase: 3.3 },
  { shape: "octahedron", pos: [-2.2, -1.6, 0.3], size: 1.0, kind: "teal", spin: [0.3, 0.5, 0.1], bob: 0.55, phase: 4.0 },
  { shape: "tetrahedron", pos: [0.1, 2.7, -0.8], size: 0.8, kind: "dark", spin: [0.35, 0.2, 0.4], bob: 0.8, phase: 5.1 },
  { shape: "knot", pos: [0.4, -2.8, -0.2], size: 0.55, kind: "pink", spin: [0.25, 0.45, 0.15], bob: 0.65, phase: 0.7 },
];

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
    case "knot":
      return <torusKnotGeometry args={[size * 0.8, size * 0.25, 96, 16]} />;
  }
}

function Shapes({ spin }: { spin: number }) {
  const meshes = useRef<(THREE.Mesh | null)[]>([]);

  const mats = useMemo(
    () => ({
      pink: makeMaterial("#da7b93", "#2e151b", 0),
      teal: makeMaterial("#8dbcbc", "#1c3334", 0),
      dark: makeMaterial("#376e6f", "#1c3334", -0.25),
    }),
    []
  );

  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);

  // Each shape turns on its own axes and bobs gently. With spin = 0
  // (reduced motion) everything stays still.
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    ITEMS.forEach((it, i) => {
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
      {ITEMS.map((it, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          position={it.pos}
          material={mats[it.kind]}
        >
          <Geometry shape={it.shape} size={it.size} />
        </mesh>
      ))}
    </>
  );
}

// Moves the whole group gently toward the pointer and positions it beside the hero text.
function Rig({ spin }: { spin: number }) {
  const group = useRef<THREE.Group>(null);
  const width = useThree((s) => s.viewport.width);
  const wide = width > 9;

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.35 * spin, 2.5, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.2 * spin, 2.5, dt);
  });

  return (
    <group ref={group} position={[wide ? width * 0.25 : 0, 0, 0]} scale={wide ? 0.95 : 0.7}>
      <Shapes spin={spin} />
    </group>
  );
}

export default function HeroScene() {
  // spin = 0 freezes the animation for people who prefer reduced motion.
  const [spin, setSpin] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSpin(mq.matches ? 0 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      // The canvas sits behind the page content, so listen for the pointer on <body>.
      eventSource={document.body}
      eventPrefix="client"
    >
      <Rig spin={spin} />
    </Canvas>
  );
}
