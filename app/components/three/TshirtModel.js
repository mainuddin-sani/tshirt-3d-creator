"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";

export default function TshirtModel() {
  const { previewImage, tshirt } = useSelector((s) => s.editor);
  const activeTshirt = tshirt.list.find((t) => t.id === tshirt.activeId);
  console.log("Active T-shirt:", activeTshirt);
  // console.log("Preview Image:", previewImage);

  // Always call hooks in the same order — compute model path and call useGLTF unconditionally
  const modelPath = activeTshirt?.model || "/models/shirt.glb";
  const { scene, materials } = useGLTF(modelPath);

  // Debug: log scene & materials to help identify why the model may be invisible
  console.log("GLTF loaded:", {
    modelPath,
    sceneChildren: scene?.children?.length,
    materials: Object.keys(materials || {}),
  });

  // If no scene is loaded yet, don't render anything (suspense will handle loading)
  if (!scene) return null;

  // Fit the loaded model to view and normalize materials so it is visible
  useEffect(() => {
    if (!scene) return;

    // compute bounding box & center
    const bbox = new THREE.Box3().setFromObject(scene);
    const size = bbox.getSize(new THREE.Vector3());
    const center = bbox.getCenter(new THREE.Vector3());

    console.log("GLTF bbox:", { size, center });

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 1.5 / maxDim : 1;

    scene.scale.setScalar(scale);
    scene.position.x = -center.x * scale;
    // lower the model slightly so it sits in view
    scene.position.y = -center.y * scale - 0.05;
    scene.position.z = -center.z * scale;

    // Ensure meshes render correctly (double sided + shadows) and are updated
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.side = THREE.DoubleSide;
          // add a small emissive to make white shirts visible on white backgrounds during debugging
          if (child.material.emissive) child.material.emissive.setHex(0x111111);
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!materials || !activeTshirt?.color) return;

    Object.values(materials).forEach((mat) => {
      if (mat.color) mat.color = new THREE.Color(activeTshirt.color);
      mat.needsUpdate = true;
    });
  }, [activeTshirt?.color, materials]);

  useEffect(() => {
    if (!previewImage || !materials) return;

    const texture = new THREE.TextureLoader().load(previewImage);
    texture.flipY = false;

    Object.values(materials).forEach((mat) => {
      mat.map = texture;
      mat.needsUpdate = true;
    });
  }, [previewImage, materials]);

  // If the loaded scene has no visible children, render a small debug mesh + axes so we can see the canvas
  const hasChildren = scene?.children?.length > 0;

  return (
    <group>
      {hasChildren ? (
        <primitive object={scene} />
      ) : (
        <>
          <axesHelper args={[1]} />
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color={activeTshirt.color || "hotpink"} />
          </mesh>
        </>
      )}
    </group>
  );
}
