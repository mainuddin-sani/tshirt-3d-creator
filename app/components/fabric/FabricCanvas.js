"use client";

import {
    setPreviewImage,
    updateCanvasData,
} from "@/app/features/editor/editorSlice";
import {
    disposeFabric,
    getFabricCanvas,
    initFabric,
} from "@/app/lib/fabric/initFabric";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FabricCanvas() {
  const dispatch = useDispatch();
  const { currentSide, frontCanvasData, backCanvasData, tshirt } = useSelector(
    (s) => s.editor,
  );
  const tshirtColor = tshirt.list.find((t) => t.id === tshirt.activeId)?.color;
  const isInitialMount = useRef(true);

  useEffect(() => {
    const canvas = initFabric("fabric-canvas", 250, 350);
    let isDisposed = false;

    const updatePreview = () => {
      if (isDisposed) return;
      dispatch(setPreviewImage(canvas.toDataURL({ multiplier: 2 })));
      dispatch(updateCanvasData(canvas.toJSON()));
    };

    canvas.on("object:added", updatePreview);
    canvas.on("object:modified", updatePreview);
    canvas.on("object:removed", updatePreview);
    canvas.on("text:changed", updatePreview);

    // Function to load side data safely
    const loadSideData = (data) => {
      canvas.clear();
      // Ensure canvas background is always transparent for the silhouette effect
      canvas.backgroundColor = "transparent";
      
      if (data) {
        canvas.loadFromJSON(data, () => {
          if (isDisposed) return;
          canvas.renderAll();
          updatePreview();
        });
      } else {
        canvas.renderAll();
        updatePreview();
      }
    };

    // Load initial side
    const initialData = currentSide === "front" ? frontCanvasData : backCanvasData;
    loadSideData(initialData);

    return () => {
      isDisposed = true;
      canvas.off("object:added", updatePreview);
      canvas.off("object:modified", updatePreview);
      canvas.off("object:removed", updatePreview);
      canvas.off("text:changed", updatePreview);
      disposeFabric();
    };
  }, []);

  // Handle side switching independently but safely
  useEffect(() => {
    const canvas = getFabricCanvas();
    if (!canvas || isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentData = currentSide === "front" ? frontCanvasData : backCanvasData;
    
    // Check if canvas is still valid (not disposed)
    if (canvas.getContext()) {
      canvas.clear();
      canvas.backgroundColor = "transparent";
      
      if (currentData) {
        canvas.loadFromJSON(currentData, () => {
          canvas.renderAll();
          dispatch(setPreviewImage(canvas.toDataURL({ multiplier: 2 })));
        });
      } else {
        canvas.renderAll();
        dispatch(setPreviewImage(canvas.toDataURL({ multiplier: 2 })));
      }
    }
  }, [currentSide]);

  // Sync color changes independently
  useEffect(() => {
    const canvas = getFabricCanvas();
    if (!canvas || !canvas.getContext()) return;
    
    canvas.renderAll();
    dispatch(setPreviewImage(canvas.toDataURL({ multiplier: 2 })));
  }, [tshirtColor]);

  return (
    <div style={{ 
      position: "relative", 
      width: 500, 
      height: 600, 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      {/* T-shirt Silhouette Background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: tshirtColor,
        maskImage: "url('/tshirt-template.svg')",
        WebkitMaskImage: "url('/tshirt-template.svg')",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        transition: "background-color 0.3s"
      }} />

      {/* Design Area (The Canvas) */}
      <div style={{ 
        position: "relative", 
        zIndex: 1, 
        width: 250, 
        height: 350, 
        marginTop: -50, // Adjust to position on chest
        border: "1px dashed rgba(0,0,0,0.1)"
      }}>
         <canvas id="fabric-canvas" />
      </div>

      <div style={{ position: "absolute", bottom: -30, fontSize: "12px", color: "#666" }}>
        Design Area (Chest)
      </div>
    </div>
  );
}
