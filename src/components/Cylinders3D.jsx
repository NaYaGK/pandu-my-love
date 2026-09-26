import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function RotatingCylinder({ position, scale, rotationSpeed, color1, color2 }) {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x * delta;
      meshRef.current.rotation.y += rotationSpeed.y * delta;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <cylinderGeometry args={[1, 1, 3, 32]} />
        <meshPhysicalMaterial 
          color={color1}
          emissive={color2}
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function Cylinders3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffb6c1" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8a2be2" />
        
        {/* Environment map for reflections */}
        <Environment preset="city" />

        <RotatingCylinder 
          position={[-4, 2, -2]} 
          scale={[0.8, 0.8, 0.8]} 
          rotationSpeed={{ x: 0.2, y: 0.3 }}
          color1="#ff69b4"
          color2="#ff1493"
        />
        <RotatingCylinder 
          position={[5, -3, -5]} 
          scale={[1.2, 1.2, 1.2]} 
          rotationSpeed={{ x: -0.1, y: 0.2 }}
          color1="#da70d6"
          color2="#8a2be2"
        />
        <RotatingCylinder 
          position={[3, 4, -8]} 
          scale={[1.5, 1.5, 1.5]} 
          rotationSpeed={{ x: 0.3, y: -0.2 }}
          color1="#ffb6c1"
          color2="#ff69b4"
        />
        <RotatingCylinder 
          position={[-5, -4, -10]} 
          scale={[2, 2, 2]} 
          rotationSpeed={{ x: 0.1, y: 0.1 }}
          color1="#ffc0cb"
          color2="#ffb6c1"
        />
      </Canvas>
    </div>
  );
}
