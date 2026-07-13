import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

const MorphingCloud = ({ darkMode, isBursting }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    
    // Smoothly follow the mouse with the sphere's position
    const targetX = state.pointer.x * 5;
    const targetY = state.pointer.y * 5;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.03);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.03);
    
    // Bursting animation scale and distortion
    const targetScale = isBursting ? 15 : 2;
    const currentScale = meshRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.04);
    meshRef.current.scale.set(newScale, newScale, newScale);
    
    // Bursting increases distortion
    materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, isBursting ? 1.5 : 0.8, 0.05);
    materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, isBursting ? 4 : 1.5, 0.05);

    // Color shifting animation (breathing thoughts/emotions)
    const time = state.clock.getElapsedTime();
    const hueShift = Math.sin(time * 0.3) * 0.05; // Gentle hue breathing
    
    if (darkMode) {
      // Base: Golden / Amber / Muted Slate
      const baseColor = new THREE.Color('#d4af37');
      baseColor.offsetHSL(hueShift, 0, 0);
      materialRef.current.color.lerp(baseColor, 0.05);
    } else {
      // Base: Earthy Sand / Warm Grey
      const baseColor = new THREE.Color('#a89968');
      baseColor.offsetHSL(hueShift, 0, 0);
      materialRef.current.color.lerp(baseColor, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          ref={materialRef}
          roughness={1}
          metalness={0}
          emissive={darkMode ? "#332211" : "#554422"}
          emissiveIntensity={0.1}
          distort={0.8}
          speed={1.5}
          transparent={true}
          opacity={darkMode ? 0.25 : 0.15}
          color={darkMode ? "#d4af37" : "#a89968"}
        />
      </Sphere>
    </Float>
  );
};

// Component to inject window mouse coordinates into R3F state
const GlobalMouseTracker = () => {
  const { set } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to -1 to +1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      set({ pointer: new THREE.Vector2(x, y) });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [set]);
  
  return null;
};

const LiquidZenScene = ({ darkMode, isBursting }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]} style={{ pointerEvents: 'none' }}>
        <ambientLight intensity={darkMode ? 0.3 : 1} />
        <directionalLight position={[10, 10, 5]} intensity={darkMode ? 1 : 2} color={darkMode ? "#ffddaa" : "#ffffff"} />
        
        <GlobalMouseTracker />
        <MorphingCloud darkMode={darkMode} isBursting={isBursting} />
      </Canvas>
    </div>
  );
};

export default LiquidZenScene;
