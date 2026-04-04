'use client';

import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, extend, useLoader } from '@react-three/fiber';
import { Sphere, Float, Points, PointMaterial, Box } from '@react-three/drei';
import * as THREE from 'three';

const mouseRef = { x: 0, y: 0 };

class FresnelGlowMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        glowColor: { value: new THREE.Color('#ffffff') },
        intensity: { value: 2.8 },
        power: { value: 5.0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float intensity;
        uniform float power;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
          fresnel = pow(fresnel, power) * intensity;
          gl_FragColor = vec4(glowColor, fresnel);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      depthWrite: false,
    });
  }
}
extend({ FresnelGlowMaterial });

function EarthStipple({ radius }: { radius: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const alphaMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');

  const { positions } = useMemo(() => {
    const count = 18000;
    const posArr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        posArr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        posArr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return { positions: posArr };
  }, [radius]);

  const stippleShader = useMemo(() => ({
    uniforms: { uAlphaMap: { value: alphaMap } },
    vertexShader: `
        uniform sampler2D uAlphaMap;
        varying float vVisible;
        void main() {
            vec3 pos = position;
            float u = 0.5 + atan(pos.z, pos.x) / (2.0 * 3.14159265);
            float v = 0.5 - asin(pos.y / length(pos)) / 3.14159265;
            float mask = texture2D(uAlphaMap, vec2(u, v)).r;
            vVisible = mask > 0.05 ? 1.0 : 0.0;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = (0.045 * (450.0 / -mvPosition.z)) * vVisible;
            gl_Position = projectionMatrix * mvPosition;
        }
    `,
    fragmentShader: `
        varying float vVisible;
        void main() {
            if (vVisible < 0.5) discard;
            float r = distance(gl_PointCoord, vec2(0.5));
            if (r > 0.5) discard;
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
    `,
  }), [alphaMap]);

  return (
    <points ref={pointsRef}>
        <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <shaderMaterial attach="material" {...stippleShader} transparent />
    </points>
  );
}

function FloatingCandlesticks({ isMobile }: { isMobile: boolean }) {
  const count = isMobile ? 15 : 60;
  const stickRef = useRef<THREE.Group>(null);
  const stickData = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
        const isBullish = Math.random() > 0.5;
        const z = isMobile ? (Math.random() * -5) : (Math.random() * -15 + 2);
        arr.push({
            id: i,
            pos: [ (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, z ] as [number, number, number],
            scale: [0.1, Math.random() * 2 + 0.5, 0.1] as [number, number, number],
            color: isBullish ? '#39FF14' : '#DC143C',
            speed: (Math.random() * 0.5 + 0.1) * (z < -5 ? 0.3 : 1),
        });
    }
    return arr;
  }, [count, isMobile]);

  useFrame(() => {
    if (stickRef.current) {
        stickRef.current.position.x = -mouseRef.x * 2.5;
        stickRef.current.position.y = -mouseRef.y * 2.5;
        stickRef.current.children.forEach((child, i) => {
            const data = stickData[i];
            if (data) {
                child.position.y += data.speed * 0.05;
                if (child.position.y > 10) child.position.y = -10;
            }
        });
    }
  });

  return (
    <group ref={stickRef as any}>
      {stickData.map((data) => (
        <group key={data.id} position={data.pos}>
            <Box args={data.scale}>
                <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={1.5} />
            </Box>
            <Box args={[0.02, data.scale[1] + 0.4, 0.02]}>
                <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={0.8} />
            </Box>
        </group>
      ))}
    </group>
  );
}

function RotatingGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (globeRef.current) {
        globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        globeRef.current.rotation.x = mouseRef.y * 0.1;
        globeRef.current.rotation.y += mouseRef.x * 0.1;
    }
  });

  return (
    <group ref={globeRef as any} position={[0, -2, 0]}>
      {/* SOLID BASE SPHERE */}
      <Sphere args={[3.45, 64, 64]}>
          <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
      </Sphere>
      <Suspense fallback={null}>
        <EarthStipple radius={3.5} />
      </Suspense>
      <Sphere args={[3.55, 64, 64]}>
          {/* @ts-ignore */}
          <fresnelGlowMaterial />
      </Sphere>
    </group>
  );
}

export default function ThreeCyberGlobe() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-visible" style={{ zIndex: 0, top: 0, height: '100vh' }}>
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <FloatingCandlesticks isMobile={isMobile} />
        </Canvas>
      </div>

      {/* FINAL POSITIONING LOCK: bottom: -30% right: -25% */}
      <div className="absolute 
        bottom-[-20%] right-[-20%] w-[90vw] h-[90vw] 
        md:bottom-[-30%] md:right-[-25%] md:w-[75vw] md:h-[120vh] 
        opacity-100 overflow-visible"
      >
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 5, 5]} intensity={3} color="#ffffff" />
          <RotatingGlobe />
        </Canvas>
      </div>
    </div>
  );
}
