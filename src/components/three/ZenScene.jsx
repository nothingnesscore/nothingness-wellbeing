import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * ZenScene — the 3D centrepiece for the hero.
 *
 * Design intent: the Nothingness "sanctuary" idea rendered as real optics. A thick
 * glass lens hangs in space, refracting warm colour orbs that drift behind it, with
 * a slow breathing core and thin orbital rings. Nothing is noisy; motion is on a
 * 4-7-8 breath so the whole page feels like one slow inhale.
 *
 * Palette is locked to the existing brand tokens so the 3D layer never drifts from
 * the CSS design system: gold #d4af37 / champagne #a89968, plus the azure + violet
 * accents already used by LiquidBackdropBlobs.
 */

const GOLD_DARK = '#d4af37';
const GOLD_LIGHT = '#a89968';

/* ------------------------------------------------------------------ */
/* Environment: procedural Lightformers (no HDR fetch, works offline)  */
/* ------------------------------------------------------------------ */
function StudioEnvironment({ darkMode }) {
  return (
    <Environment resolution={128} frames={1}>
      <color attach="background" args={[darkMode ? '#050505' : '#faf8f3']} />
      {/* Key light, upper left, brand gold */}
      <Lightformer
        form="circle"
        intensity={darkMode ? 5 : 3.4}
        color={GOLD_DARK}
        scale={[6, 6, 1]}
        position={[-4, 4, 3]}
        target={[0, 0, 0]}
      />
      {/* Cool rim, right, reads as the azure accent in the CSS blobs */}
      <Lightformer
        form="ring"
        intensity={darkMode ? 2.6 : 2}
        color="#7dd3fc"
        scale={[7, 7, 1]}
        position={[5, -1, -2]}
        target={[0, 0, 0]}
      />
      {/* Soft top bounce so the lens never goes fully black */}
      <Lightformer
        form="rect"
        intensity={darkMode ? 1.1 : 1.6}
        color={darkMode ? '#f8fafc' : '#ffffff'}
        scale={[9, 3, 1]}
        position={[0, 6, 2]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </Environment>
  );
}

/* ------------------------------------------------------------------ */
/* Drifting colour orbs — these are what the lens actually refracts   */
/* ------------------------------------------------------------------ */
function RefractedOrbs({ darkMode, reducedMotion }) {
  const group = useRef();

  const orbs = useMemo(
    () => [
      { color: darkMode ? '#d4af37' : '#d9b45f', pos: [-1.5, 0.85, -1.5], scale: 0.85, speed: 0.16 },
      { color: darkMode ? '#38bdf8' : '#a5d6d2', pos: [1.7, -0.7, -2.1], scale: 1.05, speed: 0.12 },
      { color: darkMode ? '#a855f7' : '#ebc3c3', pos: [0.4, -1.6, -0.9], scale: 0.7, speed: 0.2 },
    ],
    [darkMode]
  );

  useFrame((state) => {
    if (reducedMotion || !group.current) return;
    const t = state.clock.getElapsedTime();
    orbs.forEach((orb, i) => {
      const child = group.current.children[i];
      if (!child) return;
      // Slow orbital drift + a gentle breath so the refraction is always alive.
      const a = t * orb.speed;
      child.position.x = orb.pos[0] + Math.cos(a) * 0.22;
      child.position.y = orb.pos[1] + Math.sin(a * 1.3) * 0.18;
      const s = orb.scale * (1 + Math.sin(a * 0.9) * 0.08);
      child.scale.setScalar(s);
    });
  });

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos} scale={orb.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={orb.color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Breathing core — 4-7-8 rhythm, mirroring the Android Sanctuary screen */
/* ------------------------------------------------------------------ */
function BreathingCore({ darkMode, reducedMotion }) {
  const mesh = useRef();
  const mat = useRef();
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (reducedMotion || !mesh.current) return;
    elapsed.current += Math.min(delta, 0.1);

    // 4s inhale, 7s hold, 8s exhale
    const t = elapsed.current % 19;
    let phase;
    if (t < 4) phase = t / 4;
    else if (t < 11) phase = 1;
    else phase = 1 - (t - 11) / 8;

    const eased = phase * phase * (3 - 2 * phase);
    const s = 0.34 + eased * 0.14;
    mesh.current.scale.setScalar(s);

    if (mat.current) {
      const glow = darkMode ? 1.5 + eased * 1.5 : 0.7 + eased * 0.6;
      mat.current.emissiveIntensity = glow;
    }
  });

  return (
    <mesh ref={mesh} scale={0.4}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshStandardMaterial
        ref={mat}
        color={darkMode ? '#3b2f10' : '#f6ead0'}
        emissive={darkMode ? GOLD_DARK : GOLD_LIGHT}
        emissiveIntensity={darkMode ? 1.5 : 0.7}
        roughness={0.35}
        metalness={0.1}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* The glass lens                                                     */
/* ------------------------------------------------------------------ */
function GlassLens({ darkMode, reducedMotion }) {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current || reducedMotion) return;

    // Barely-there float, plus a gentle lean toward the pointer. Kept small on
    // purpose: the copy in front of it must stay the focus.
    const t = state.clock.getElapsedTime();
    mesh.current.position.y = Math.sin(t * 0.42) * 0.055;
    mesh.current.rotation.y = t * 0.055 + state.pointer.x * 0.22;
    mesh.current.rotation.x = state.pointer.y * 0.14;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.15, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        resolution={192}
        transmission={1}
        thickness={darkMode ? 1.1 : 0.85}
        roughness={darkMode ? 0.08 : 0.14}
        chromaticAberration={darkMode ? 0.34 : 0.24}
        anisotropicBlur={0.28}
        distortion={0.28}
        distortionScale={0.42}
        temporalDistortion={reducedMotion ? 0 : 0.14}
        ior={1.42}
        attenuationColor={darkMode ? '#2a2410' : '#fff6e2'}
        attenuationDistance={1.6}
        color="#ffffff"
        backsideThickness={0.35}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Orbital rings — the "orrery" read, very low contrast               */
/* ------------------------------------------------------------------ */
function OrbitalRings({ darkMode, reducedMotion }) {
  const a = useRef();
  const b = useRef();

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (a.current) a.current.rotation.z = t * 0.08;
    if (b.current) b.current.rotation.z = -t * 0.055;
  });

  const color = darkMode ? GOLD_DARK : GOLD_LIGHT;

  return (
    <group>
      <mesh ref={a} rotation={[Math.PI / 2.5, 0.3, 0]}>
        <torusGeometry args={[1.72, 0.006, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={darkMode ? 0.4 : 0.32} toneMapped={false} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.9, -0.4, 0]}>
        <torusGeometry args={[2.02, 0.005, 8, 160]} />
        <meshBasicMaterial color={color} transparent opacity={darkMode ? 0.22 : 0.18} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Camera parallax                                                    */
/* ------------------------------------------------------------------ */
function CameraRig({ reducedMotion }) {
  useFrame((state) => {
    if (reducedMotion) return;
    const { camera, pointer } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.35, 0.045);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.22, 0.045);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* WebGL support probe — never let a missing context break the page    */
/* ------------------------------------------------------------------ */
let webglSupportCache = null;
function hasWebGL() {
  if (webglSupportCache !== null) return webglSupportCache;
  try {
    const canvas = document.createElement('canvas');
    webglSupportCache = Boolean(
      canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    );
  } catch {
    webglSupportCache = false;
  }
  return webglSupportCache;
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */
export function ZenScene({ darkMode = false, className = '' }) {
  const [supported, setSupported] = useState(null);
  const [inView, setInView] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const hostRef = useRef(null);

  useEffect(() => {
    setSupported(hasWebGL());
  }, []);

  // Stop rendering entirely once the hero scrolls away — a permanent
  // requestAnimationFrame loop behind the whole site is not worth the battery.
  useEffect(() => {
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [supported]);

  // `pointer-events: none` is load-bearing here: this canvas sits behind the hero
  // copy and must never intercept a click meant for the booking CTA. Set on our
  // own wrapper (pointer-events is inherited) *and* on the Canvas, so the canvas
  // element is un-hittable even if the R3F wrapper markup changes.
  return (
    <div
      ref={hostRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {supported && (
        <Canvas
          className="!pointer-events-none"
          dpr={[1, 1.35]}
          frameloop={inView ? 'always' : 'never'}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
          }}
          camera={{ position: [0, 0, 5], fov: 42 }}
        >
          <CameraRig reducedMotion={reducedMotion} />
          <StudioEnvironment darkMode={darkMode} />
          <RefractedOrbs darkMode={darkMode} reducedMotion={reducedMotion} />
          <BreathingCore darkMode={darkMode} reducedMotion={reducedMotion} />
          <OrbitalRings darkMode={darkMode} reducedMotion={reducedMotion} />
          <GlassLens darkMode={darkMode} reducedMotion={reducedMotion} />
          <Sparkles
            count={reducedMotion ? 0 : 46}
            scale={[7, 5, 4]}
            size={1.6}
            speed={0.22}
            opacity={darkMode ? 0.5 : 0.35}
            color={darkMode ? GOLD_DARK : '#c8b48a'}
          />
        </Canvas>
      )}
    </div>
  );
}

export default ZenScene;