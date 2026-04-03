'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function LiquidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // subtle mouse tracking
      meshRef.current.rotation.x += (state.pointer.y * 0.1);
      meshRef.current.rotation.y += (state.pointer.x * 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Icosahedron ref={meshRef as any} args={[2.5, 4]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#333333"
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={1}
          roughness={0.2}
          distort={0.4}
          speed={2}
        />
      </Icosahedron>
    </Float>
  );
}

export default function ThreeAbstractMesh() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#555555" />
        
        {/* Adds sleek environment reflections off the dark metal */}
        <Environment preset="studio" />
        
        <Sparkles count={50} scale={10} size={2} speed={0.2} color="#ffffff" opacity={0.3} />
        
        <LiquidMesh />
      </Canvas>
    </div>
  );
}
