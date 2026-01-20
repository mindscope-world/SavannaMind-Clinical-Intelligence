
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GlobeScene: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const globeRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Points>(null);
  
  // Create continental points (simulated)
  const points = useMemo(() => {
    const pts = [];
    const count = 3000;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      // Basic sphere distribution
      const r = 2.05;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      
      // Filter out points to simulate continents (very rough approximation)
      const noise = Math.sin(phi * 4) * Math.cos(theta * 2);
      if (noise > -0.4) {
        pts.push(x, y, z);
      }
    }
    return new Float32Array(pts);
  }, []);

  useFrame((state, delta) => {
    if (globeRef.current && !isHovered) {
      globeRef.current.rotation.y += delta * 0.15;
    }
    if (cloudRef.current) {
      // Subtle pulse
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.005;
      cloudRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={globeRef}>
      {/* Base Globe Core */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial 
          color="#011627" 
          roughness={0.1} 
          metalness={0.8}
          emissive="#00111a"
          emissiveIntensity={isHovered ? 2 : 0.5}
        />
      </Sphere>

      {/* Atmospheric Glow Layer (Fresnel) */}
      <Sphere args={[2.02, 64, 64]}>
        <meshBasicMaterial 
          color="#22d3ee" 
          transparent 
          opacity={isHovered ? 0.15 : 0.05} 
          wireframe
        />
      </Sphere>

      {/* Continental Point Cloud */}
      <Points ref={cloudRef} positions={points}>
        <PointMaterial
          transparent
          color={isHovered ? "#22d3ee" : "#475569"}
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Decorative Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 2.41, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const VisualGlobe: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-full h-full relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
        
        {/* Cinematic Lights */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={isHovered ? 2 : 1} color="#ffffff" />
        <pointLight position={[0, -5, 5]} intensity={0.5} color="#0d9488" />

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <GlobeScene isHovered={isHovered} />
        </Float>
        
        {/* Background Depth Orbs */}
        <Sphere args={[15, 32, 32]} position={[0, 0, -10]}>
          <meshBasicMaterial color="#011627" side={THREE.BackSide} />
        </Sphere>
      </Canvas>

      {/* HTML Overlay for interactions */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-cyan-400/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
          System Standby: Analysis Halted
        </div>
      </div>
    </div>
  );
};

export default VisualGlobe;
