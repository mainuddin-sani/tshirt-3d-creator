"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import TshirtModel from "./TshirtModel";

export default function TshirtScene() {
  return (
    <Canvas camera={{ position: [0, 0, 2.5] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} />
      <Suspense fallback={null}>
        <TshirtModel />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
