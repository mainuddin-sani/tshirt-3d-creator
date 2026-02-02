"use client";

import { getFabricCanvas } from "@/app/lib/fabric/initFabric";
import * as fabric from "fabric";

export default function TextToolbar() {
  const addText = () => {
    const canvas = getFabricCanvas();
    if (!canvas) return;

    const text = new fabric.IText("Type here", {
      left: 100,
      top: 100,
      fontSize: 40,
      fill: "#000000",
      fontFamily: "Arial",
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  };

  const addLogo = (e) => {
    const canvas = getFabricCanvas();
    if (!canvas || !e.target.files[0]) return;

    const reader = new FileReader();
    reader.onload = async (f) => {
      const data = f.target.result;
      const img = await fabric.FabricImage.fromURL(data);
      img.scale(0.2);
      canvas.add(img);
      canvas.setActiveObject(img);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
      <button
        onClick={addText}
        style={{
          padding: "10px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Text
      </button>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label style={{ fontSize: "14px", fontWeight: "bold" }}>Add Logo:</label>
        <input type="file" accept="image/*" onChange={addLogo} />
      </div>
    </div>
  );
}
