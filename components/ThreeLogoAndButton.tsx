'use client';

import { Canvas } from '@react-three/fiber';
import { Text, Environment, Float, Center } from '@react-three/drei';

function LogoText() {
  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <Center position={[0, 0, 0]}>
        <Text
          fontSize={2.8}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
          fontWeight={900}
          letterSpacing={0.15}
        >
          PROFEX
          <meshStandardMaterial 
            color="#E4E4E7"
            metalness={1}
            roughness={0.15}
            envMapIntensity={2.5}
          />
        </Text>
      </Center>
    </Float>
  );
}

export default function ThreeLogo() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#A1A1AA" />
        
        {/* High quality studio environment for metallic reflections */}
        <Environment preset="studio" />
        
        <LogoText />
      </Canvas>
    </div>
  );
}
