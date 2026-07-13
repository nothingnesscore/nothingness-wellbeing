import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleCloud = ({ darkMode, isBursting }) => {
  const pointsRef = useRef();
  const materialRef = useRef();
  
  const count = 4000;
  
  // Pre-calculate particle positions and target scatter directions
  const [positions, originalPositions, randomDirections, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const dirs = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spherical distribution, clustered towards the center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      // radius factor to cluster closer to center (smaller cloud overall)
      const r = 0.5 * Math.pow(Math.random(), 1.5); 
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
      
      orig[i3] = x;
      orig[i3 + 1] = y;
      orig[i3 + 2] = z;
      
      // Random direction for bursting/scattering
      // We push them very far out in random directions
      const scatterDist = Math.random() * 20 + 5;
      dirs[i3] = x * scatterDist + (Math.random() - 0.5) * 5;
      dirs[i3 + 1] = y * scatterDist + (Math.random() - 0.5) * 5;
      dirs[i3 + 2] = z * scatterDist + (Math.random() - 0.5) * 5;
      
      // Individual particle speed variance for organic feeling
      speeds[i] = Math.random() * 0.05 + 0.01;
    }
    return [pos, orig, dirs, speeds];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smoothly shift colors through muted, ethereal hues
    if (materialRef.current) {
      // Very slow hue shift
      const hue = (time * 0.03) % 1; 
      
      if (darkMode) {
         // Amber / Gold / Warm glowing base
         materialRef.current.color.setHSL(hue, 0.4, 0.5);
      } else {
         // Muted, sandy / warm grey base
         materialRef.current.color.setHSL(hue, 0.3, 0.4);
      }
    }

    if (pointsRef.current) {
      // Fluid, wave-like follow (increased lerp factor so it doesn't feel too slow)
      const targetX = state.pointer.x * 1.2;
      const targetY = state.pointer.y * 1.2;
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.04);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.04);

      // Subtle wave-like tilt (rotation) based on mouse position
      const targetRotX = state.pointer.y * 0.3;
      const targetRotY = state.pointer.x * 0.3;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotX + time * 0.04, 0.03);
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotY + time * 0.08, 0.03);

      // Disintegration / Reintegration particle logic
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        if (isBursting) {
           // Disintegrate: violently scatter particles toward random targets
           positionsAttr.array[i3] = THREE.MathUtils.lerp(positionsAttr.array[i3], randomDirections[i3], speeds[i] * 2);
           positionsAttr.array[i3 + 1] = THREE.MathUtils.lerp(positionsAttr.array[i3 + 1], randomDirections[i3 + 1], speeds[i] * 2);
           positionsAttr.array[i3 + 2] = THREE.MathUtils.lerp(positionsAttr.array[i3 + 2], randomDirections[i3 + 2], speeds[i] * 2);
        } else {
           // Reintegrate: gentle, liquid-like breathing sine waves
           const floatX = Math.sin(time * 1.5 + i * 0.1) * 0.03;
           const floatY = Math.cos(time * 1.8 + i * 0.1) * 0.03;
           const floatZ = Math.sin(time * 1.2 + i * 0.1) * 0.03;
           
           positionsAttr.array[i3] = THREE.MathUtils.lerp(positionsAttr.array[i3], originalPositions[i3] + floatX, speeds[i]);
           positionsAttr.array[i3 + 1] = THREE.MathUtils.lerp(positionsAttr.array[i3 + 1], originalPositions[i3 + 1] + floatY, speeds[i]);
           positionsAttr.array[i3 + 2] = THREE.MathUtils.lerp(positionsAttr.array[i3 + 2], originalPositions[i3 + 2] + floatZ, speeds[i]);
        }
      }
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.04}
        transparent={true}
        opacity={darkMode ? 0.6 : 0.6}
        sizeAttenuation={true}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Component to inject window mouse coordinates into R3F state globally
const GlobalMouseTracker = () => {
  const { set } = useThree();
  
  useEffect(() => {
    const handleMove = (e) => {
      // Handle both mouse and touch events
      let clientX, clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      // Normalize to -1 to +1
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      set({ pointer: new THREE.Vector2(x, y) });
    };
    
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchstart', handleMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchstart', handleMove);
    };
  }, [set]);
  
  return null;
};

const LiquidZenScene = ({ darkMode, isBursting }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} style={{ pointerEvents: 'none' }}>
        <GlobalMouseTracker />
        <ParticleCloud darkMode={darkMode} isBursting={isBursting} />
      </Canvas>
    </div>
  );
};

export default LiquidZenScene;
