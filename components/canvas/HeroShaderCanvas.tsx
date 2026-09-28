"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ShaderFallback } from "./ShaderFallback";

const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  uniform vec2 uMouse;

  // Simple 2D pseudo random & noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Distance to interactive mouse
    float dist = distance(uv, uMouse);
    float mouseInfluence = smoothstep(0.65, 0.0, dist) * 0.45;

    // Fluid organic waves
    float wave1 = snoise(uv * 2.2 + vec2(uTime * 0.15, uTime * 0.12));
    float wave2 = snoise(uv * 4.0 - vec2(uTime * 0.08, -uTime * 0.1));
    float elevation = (wave1 * 0.45 + wave2 * 0.25 + mouseInfluence * 0.4);

    pos.z += elevation * 0.6;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColorA; // Ultramarine #3D5AFE
  uniform vec3 uColorB; // Coral #FF5A3C
  uniform vec3 uColorC; // Deep navy/surface
  uniform float uThemeFactor; // 0 for dark, 1 for light

  void main() {
    // Distance from center and mouse
    float distToMouse = distance(vUv, uMouse);
    float mouseGlow = smoothstep(0.5, 0.0, distToMouse);

    // Color mixing based on wave height and mouse interaction
    float mixWave = smoothstep(-0.4, 0.6, vElevation);
    
    vec3 baseColor = mix(uColorC, uColorA, mixWave * 0.7);
    vec3 highlightColor = mix(baseColor, uColorB, mouseGlow * 0.85 + (vElevation > 0.35 ? 0.35 : 0.0));

    // Dynamic vignette falloff for editorial cleanliness
    float vignette = smoothstep(0.9, 0.2, distance(vUv, vec2(0.5)));

    // Subtle luminance modulation
    float alpha = mix(0.65, 0.4, uThemeFactor) * vignette;

    gl_FragColor = vec4(highlightColor, alpha);
  }
`;

function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const currentMouse = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColorA: { value: new THREE.Color("#3D5AFE") },
      uColorB: { value: new THREE.Color("#FF5A3C") },
      uColorC: { value: new THREE.Color("#0A0B10") },
      uThemeFactor: { value: 0.0 }
    }),
    []
  );

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      targetMouse.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight
      };
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    if (!material.uniforms) return;

    // Smooth lerp mouse coordinates
    currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
    currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;

    material.uniforms.uMouse.value.set(currentMouse.current.x, currentMouse.current.y);
    material.uniforms.uTime.value += delta * 0.8;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[-Math.PI / 6, 0, 0]}>
      <planeGeometry args={[7, 5, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        wireframe={false}
      />
    </mesh>
  );
}

export function HeroShaderCanvas() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isClient) return <ShaderFallback />;
  if (isMobile) return <ShaderFallback />;

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="w-full h-full"
      >
        <FluidMesh />
      </Canvas>
      {/* Soft gradient masks to seamlessly blend into background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/80 via-transparent to-[var(--bg)]/80 pointer-events-none" />
    </div>
  );
}
