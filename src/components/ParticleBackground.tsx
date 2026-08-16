import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 12;
    return arr;
  }, []);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.02;
    ref.current.rotation.y += delta * 0.03;
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

function FloatingOrb({
  position,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.4;
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.y = t * 0.5;
  });
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
        wireframe
      />
    </mesh>
  );
}

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a78bfa" />
        <pointLight position={[-10, -10, 5]} intensity={0.8} color="#60a5fa" />
        <Particles />
        <FloatingOrb position={[-3, 1, -2]} color="#a78bfa" speed={0.6} />
        <FloatingOrb position={[3, -1, -3]} color="#60a5fa" speed={0.8} />
        <FloatingOrb position={[0, 2, -4]} color="#22d3ee" speed={0.5} />
      </Canvas>
    </div>
  );
}