import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleCloud = ({ darkMode, isBursting }) => {
  const pointsRef = useRef();
  const materialRef = useRef();
  
  const count = 5000; // Increased count for dense data bands
  
  // Create perfect circular texture for particles
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Pre-calculate Animus-style horizontal band positions
  const [positions, originalPositions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    const numLines = 80;
    const particlesPerLine = Math.floor(count / numLines); 
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const lineIndex = Math.floor(i / particlesPerLine);
      const particleIndex = i % particlesPerLine;
      
      // Spread X across screen space
      const x = -8 + (particleIndex / particlesPerLine) * 16;
      // Spread Y across screen space
      const y = 4 - (lineIndex / numLines) * 8;
      const z = 0;
      
      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
      
      orig[i3] = x;
      orig[i3 + 1] = y;
      orig[i3 + 2] = z;
      
      // Random speed for organic spring feel
      speeds[i] = 0.02 + Math.random() * 0.03;
    }
    
    return [pos, orig, speeds];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smoothly shift colors through ethereal hues
    if (materialRef.current) {
      const hue = (time * 0.02) % 1; 
      
      if (darkMode) {
         // Vibrant glowing amber/gold for true-black AMOLED contrast
         materialRef.current.color.setHSL(hue, 0.6, 0.6);
      } else {
         // Muted, sandy / warm grey base
         materialRef.current.color.setHSL(hue, 0.3, 0.4);
      }
    }

    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      
      // Unproject mouse coordinates to accurate Z=0 world plane
      const vec = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
      vec.unproject(state.camera);
      vec.sub(state.camera.position).normalize();
      const distance = -state.camera.position.z / vec.z;
      const mousePos = new THREE.Vector3().copy(state.camera.position).add(vec.multiplyScalar(distance));
      const mouseWorldX = mousePos.x;
      const mouseWorldY = mousePos.y;

      // Gentle floating of the entire grid
      pointsRef.current.position.x = Math.sin(time * 0.1) * 0.2;
      pointsRef.current.position.y = Math.cos(time * 0.1) * 0.2;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const lineIndex = Math.floor(i / (count / 80));
        
        // Alternating bands: even lines are "hard/dense", odd lines are "soft/sparse"
        const isHardBand = lineIndex % 2 === 0;
        
        // Gentle horizontal drift (data stream)
        const driftSpeed = isHardBand ? 0.3 : 0.15;
        let currentOrigX = originalPositions[i3] + (time * driftSpeed);
        
        // Wrap around seamlessly over the [-8, 8] range (width = 16)
        currentOrigX = ((currentOrigX + 8) % 16 + 16) % 16 - 8;
        
        // Data wave effect
        const waveAmp = isHardBand ? 0.06 : 0.02;
        const waveY = Math.sin(time * 1.5 + currentOrigX * 2) * waveAmp;
        
        // Strict balloon mouse interaction (mouseWorldX/Y computed precisely above)
        const dx = currentOrigX - mouseWorldX;
        const dy = originalPositions[i3 + 1] - mouseWorldY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let pullX = 0;
        let pullY = 0;
        let pullZ = 0;
        
        // When mouse is near, attract and distort like a balloon
        if (dist < 1.8) {
           const force = (1.8 - dist) / 1.8; 
           const curve = Math.pow(force, 1.5);
           
           // Pull strictly towards mouse (concentration)
           pullX = -dx * curve * 0.9;
           pullY = -dy * curve * 0.9;
           
           // Bulge out in Z to make the balloon 3D and spherical
           pullZ = curve * 1.5;
        }

        if (isBursting) {
           const activeWaveX = (Math.random() - 0.5) * 0.5;
           const activeWaveY = (Math.random() - 0.5) * 0.5;
           const activeWaveZ = (Math.random() - 0.5) * 2;
           positionsAttr.array[i3] = THREE.MathUtils.lerp(positionsAttr.array[i3], currentOrigX + pullX + activeWaveX, speeds[i] * 3.0);
           positionsAttr.array[i3 + 1] = THREE.MathUtils.lerp(positionsAttr.array[i3 + 1], originalPositions[i3 + 1] + pullY + activeWaveY, speeds[i] * 3.0);
           positionsAttr.array[i3 + 2] = THREE.MathUtils.lerp(positionsAttr.array[i3 + 2], originalPositions[i3 + 2] + pullZ + activeWaveZ, speeds[i] * 3.0);
        } else {
           positionsAttr.array[i3] = THREE.MathUtils.lerp(positionsAttr.array[i3], currentOrigX + pullX, speeds[i] * 4.0);
           positionsAttr.array[i3 + 1] = THREE.MathUtils.lerp(positionsAttr.array[i3 + 1], originalPositions[i3 + 1] + waveY + pullY, speeds[i] * 4.0);
           positionsAttr.array[i3 + 2] = THREE.MathUtils.lerp(positionsAttr.array[i3 + 2], pullZ, speeds[i] * 4.0);
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
        size={0.06}
        map={circleTexture}
        alphaTest={0.01}
        transparent={true}
        opacity={darkMode ? 0.9 : 0.7}
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
      // Map to normalized device coordinates [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      set({ pointer: new THREE.Vector2(x, y) });
    };
    
    // Add touch support
    const handleTouch = (e) => {
      if(e.touches.length > 0) {
        const x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        const y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        set({ pointer: new THREE.Vector2(x, y) });
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleTouch, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, [set]);

  return null;
};

const LiquidZenScene = ({ darkMode, isBursting }) => {
  return (
    <div className="w-full h-screen fixed inset-0 z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]} // Support high-dpi displays but cap at 2x for performance
        gl={{ alpha: true, antialias: true }}
      >
        <GlobalMouseTracker />
        <ParticleCloud darkMode={darkMode} isBursting={isBursting} />
      </Canvas>
    </div>
  );
};

export default LiquidZenScene;
