import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import type { Mesh, Group } from "three";

function Node({ position, color, size = 0.15 }: { position: [number, number, number]; color: string; size?: number }) {
    const meshRef = useRef<Mesh>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.001;
        }
    });
    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.4} metalness={0.6} />
        </mesh>
    );
}

function Edge({ start, end, color = "#6366f1" }: { start: [number, number, number]; end: [number, number, number]; color?: string }) {
    const points = useMemo<[number, number, number][]>(() => [start, end], [start, end]);
    return <Line points={points} color={color} lineWidth={1} transparent opacity={0.25} />;
}

function NetworkGraph() {
    const groupRef = useRef<Group>(null);
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
        }
    });

    const nodes: { pos: [number, number, number]; color: string; size: number }[] = [
        { pos: [0, 0, 0], color: "#3b82f6", size: 0.22 },
        { pos: [1.5, 0.8, -0.5], color: "#8b5cf6", size: 0.16 },
        { pos: [-1.2, 1, 0.6], color: "#06b6d4", size: 0.14 },
        { pos: [0.8, -1.2, 0.8], color: "#3b82f6", size: 0.18 },
        { pos: [-1.6, -0.5, -0.3], color: "#8b5cf6", size: 0.15 },
        { pos: [1.8, -0.3, -1], color: "#06b6d4", size: 0.12 },
        { pos: [-0.5, 1.5, -0.8], color: "#3b82f6", size: 0.13 },
        { pos: [0.3, -0.8, 1.5], color: "#8b5cf6", size: 0.11 },
        { pos: [-1, -1.3, 0.9], color: "#06b6d4", size: 0.14 },
        { pos: [1.2, 1.2, 0.5], color: "#3b82f6", size: 0.1 },
        { pos: [-0.8, 0.2, 1.2], color: "#8b5cf6", size: 0.12 },
        { pos: [0.5, 0.5, -1.3], color: "#06b6d4", size: 0.13 },
    ];

    const edges: [number, number][] = [
        [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 9],
        [2, 6], [3, 7], [3, 8], [4, 8], [5, 9], [6, 10],
        [7, 10], [2, 11], [5, 11],
    ];

    return (
        <group ref={groupRef}>
            {edges.map(([a, b], i) => (
                <Edge key={i} start={nodes[a].pos} end={nodes[b].pos} />
            ))}
            {nodes.map((n, i) => (
                <Float key={i} speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
                    <Node position={n.pos} color={n.color} size={n.size} />
                </Float>
            ))}
        </group>
    );
}

export default function HeroScene() {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/20 via-transparent to-purple-900/20" />
        );
    }

    return (
        <div className="absolute inset-0 opacity-70">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ pointerEvents: "none" }}
            >
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 5]} intensity={0.8} color="#3b82f6" />
                <pointLight position={[-5, -3, 3]} intensity={0.4} color="#8b5cf6" />
                <NetworkGraph />
            </Canvas>
        </div>
    );
}
