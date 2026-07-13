import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const MorphingBlob = ({ darkMode }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smoothly follow the mouse with the sphere's rotation and position
    // state.pointer ranges from -1 to 1
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.05);
    
    // Subtle position shift for a floating parallax effect
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, state.pointer.x * 2, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, state.pointer.y * 2, 0.05);
  });

  const blobColor = darkMode ? '#d4af37' : '#a89968';
  const emissiveColor = darkMode ? '#221100' : '#443311';

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} scale={1.8}>
        <MeshDistortMaterial
          color={blobColor}
          emissive={emissiveColor}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent={true}
          opacity={darkMode ? 0.8 : 0.5}
        />
      </Sphere>
    </Float>
  );
};

const LiquidZenScene = ({ darkMode }) => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={darkMode ? 0.2 : 0.8} />
        <directionalLight position={[10, 10, 5]} intensity={darkMode ? 1.5 : 2.5} color={darkMode ? "#ffddaa" : "#ffffff"} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a89968" />
        
        <MorphingBlob darkMode={darkMode} />
        
        {/* Adds realistic reflections to the glass material */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default LiquidZenScene;
