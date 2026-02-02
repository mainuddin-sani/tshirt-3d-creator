"use client";

import { Decal, Text, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

export default function TshirtModel() {
  const { frontImage, backImage, currentSide, tshirt, textObjects } = useSelector((s) => s.editor);
  const activeTshirt = tshirt.list.find((t) => t.id === tshirt.activeId);
  const groupRef = useRef();
  
  const [frontTexture, setFrontTexture] = useState(null);
  const [backTexture, setBackTexture] = useState(null);

  const modelPath = activeTshirt?.model || "/models/shirt.glb";
  const { nodes, materials, scene } = useGLTF(modelPath);

  useEffect(() => {
    if (nodes) {
      console.log("Model Nodes:", Object.keys(nodes));
      console.log("Model Materials:", Object.keys(materials));
    }
  }, [nodes, materials]);

  // Fit and normalize
  const modelRef = useRef();
  useEffect(() => {
    if (scene && modelRef.current) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1.5 / maxDim;
      
      modelRef.current.scale.setScalar(scale);
      modelRef.current.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    }
  }, [scene]);

  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((mat) => {
        mat.side = THREE.DoubleSide;
        if (activeTshirt?.color) {
          mat.color = new THREE.Color(activeTshirt.color);
        }
        mat.map = null;
        mat.needsUpdate = true;
      });
    }
  }, [materials, activeTshirt?.color]);

  // Load textures for Image Decals (Logos)
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    if (frontImage) {
      loader.load(frontImage, (tex) => {
        tex.anisotropy = 16;
        setFrontTexture(tex);
      });
    }
    if (backImage) {
      loader.load(backImage, (tex) => {
        tex.anisotropy = 16;
        setBackTexture(tex);
      });
    }
  }, [frontImage, backImage]);

  // Auto-rotate model based on side
  useFrame(() => {
    if (!groupRef.current) return;
    const targetRotation = currentSide === "front" ? 0 : Math.PI;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation,
      0.1
    );
  });

  return (
    <group ref={groupRef}>
      <group ref={modelRef}>
        {Object.keys(nodes).map((key) => {
          const node = nodes[key];
          if (node.isMesh) {
            return (
              <mesh
                key={key}
                geometry={node.geometry}
                material={materials[node.material.name]}
                castShadow
                receiveShadow
              >
                {/* 3D Image Logos */}
                {frontTexture && (
                  <Decal
                    position={[0, 0.04, 0.15]}
                    rotation={[0, 0, 0]}
                    scale={[0.15, 0.25, 1]}
                    map={frontTexture}
                  />
                )}
                {backTexture && (
                  <Decal
                    position={[0, 0.04, -0.15]} 
                    rotation={[0, Math.PI, 0]}
                    scale={[0.15, 0.25, 1]}
                    map={backTexture}
                  />
                )}

                {/* 3D Text Objects */}
                {textObjects.map((txt) => {
                  const isFront = txt.side === "front";
                  return (
                    <Decal
                      key={txt.id}
                      position={[txt.x, txt.y, isFront ? 0.15 : -0.15]}
                      rotation={[0, isFront ? 0 : Math.PI, 0]}
                      scale={[0.5, 0.5, 1]}
                    >
                      <meshBasicMaterial transparent opacity={0} />
                      <Text
                        color={txt.color}
                        fontSize={txt.fontSize}
                        maxWidth={0.4}
                        lineHeight={1}
                        textAlign="center"
                        anchorX="center"
                        anchorY="middle"
                      >
                        {txt.text}
                      </Text>
                    </Decal>
                  );
                })}
              </mesh>
            );
          }
          return null;
        })}
      </group>
    </group>
  );
}

useGLTF.preload("/models/shirt.glb");
