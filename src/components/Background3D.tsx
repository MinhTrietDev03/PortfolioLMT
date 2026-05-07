import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Box, Points, PointMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCubes() {
  const cubesCount = 15;
  const cubes = useMemo(() => {
    return Array.from({ length: cubesCount }).map((_, i) => {
      const position = [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ];
      const scale = Math.random() * 0.8 + 0.2;
      const rotation = [Math.random() * Math.PI, Math.random() * Math.PI, 0];
      const isWireframe = Math.random() > 0.7;
      return { position, scale, rotation, id: i, isWireframe };
    });
  }, []);

  return (
    <>
      {cubes.map((cube) => (
        <Float key={cube.id} speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Box
            position={cube.position as [number, number, number]}
            scale={cube.scale}
            rotation={cube.rotation as [number, number, number]}
          >
            {cube.isWireframe ? (
              <meshBasicMaterial color="#4F8CFF" wireframe transparent opacity={0.3} />
            ) : (
              <meshPhysicalMaterial
                color="#ffffff"
                transmission={0.9}
                opacity={1}
                metalness={0.1}
                roughness={0.1}
                ior={1.5}
                thickness={0.5}
                envMapIntensity={1}
              />
            )}
          </Box>
        </Float>
      ))}
    </>
  );
}

function StarParticles() {
  const ref = useRef<THREE.Points>(null);
  const particleCount = 1500;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.02;
      ref.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function CameraRig() {
  const { camera, pointer } = useThree();
  
  useFrame(() => {
    // Smooth camera parallax based on mouse pointer
    camera.position.x += (pointer.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (pointer.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg z-10" />
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 25]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#4F8CFF" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#8B5CF6" />
        
        <FloatingCubes />
        <StarParticles />
        <Sparkles count={50} scale={15} size={2} speed={0.4} opacity={0.2} color="#00D4FF" />
        <CameraRig />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
