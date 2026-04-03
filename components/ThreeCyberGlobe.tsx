'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Sparkles, Box } from '@react-three/drei';
import * as THREE from 'three';

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      // Parallax effect on mouse move
      meshRef.current.rotation.x = (state.pointer.y * 0.1);
      meshRef.current.rotation.y += (state.pointer.x * 0.1);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef as any} args={[2.5, 64, 64]} position={[0, 0, -2]}>
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.4}
          wireframe={false}
        />
      </Sphere>
      {/* Internal Core Wireframe to simulate neon nodes */}
      <Sphere args={[2.51, 16, 16]} position={[0, 0, -2]}>
        <meshBasicMaterial color="#8A2BE2" wireframe transparent opacity={0.15} />
      </Sphere>
    </Float>
  );
}

function FloatingCandlesticks({ isMobile }: { isMobile: boolean }) {
  // Graceful degradation: limit on mobile
  const count = isMobile ? 15 : 60;

  // Generate random data for candlesticks
  const sticks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
        const isBullish = Math.random() > 0.5;
        // Z-depth for parallax
        const z = isMobile ? (Math.random() * -5) : (Math.random() * -15 + 2);
        arr.push({
            position: [
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              z
            ] as [number, number, number],
            scale: [0.1, Math.random() * 2 + 0.5, 0.1] as [number, number, number],
            color: isBullish ? '#39FF14' : '#8A2BE2',
            speed: (Math.random() * 0.5 + 0.1) * (z < -5 ? 0.3 : 1), // Parallax: deeper = slower
        });
    }
    return arr;
  }, [count, isMobile]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slight global drift + mouse parallax
      groupRef.current.position.x = -state.pointer.x * 2;
      groupRef.current.position.y = -state.pointer.y * 2;

      // individual stick animation
      groupRef.current.children.forEach((child, i) => {
        const stickData = sticks[i];
        child.position.y += stickData.speed * 0.05;
        if (child.position.y > 10) {
            child.position.y = -10;
        }
      });
    }
  });

  return (
    <group ref={groupRef as any}>
      {sticks.map((stick, i) => (
        <group key={i} position={stick.position}>
            {/* Body */}
            <Box args={stick.scale} position={[0, 0, 0]}>
                <meshStandardMaterial color={stick.color} emissive={stick.color} emissiveIntensity={0.8} />
            </Box>
            {/* Wicks */}
            <Box args={[0.02, stick.scale[1] + 0.4, 0.02]} position={[0, 0, 0]}>
                <meshStandardMaterial color={stick.color} emissive={stick.color} emissiveIntensity={0.5} />
            </Box>
        </group>
      ))}
    </group>
  );
}

export default function ThreeCyberGlobe() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <fog attach="fog" args={['#040404', 5, 20]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#39FF14" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#8A2BE2" />
        
        <Sparkles count={isMobile ? 30 : 100} scale={15} size={2} speed={0.4} color="#39FF14" opacity={0.4} />
        
        <GlobeMesh />
        <FloatingCandlesticks isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
