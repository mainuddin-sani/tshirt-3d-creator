"use client";

import { addText, removeText, updateText } from "@/app/features/editor/editorSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ThreeTextControls() {
  const dispatch = useDispatch();
  const textObjects = useSelector((s) => s.editor.textObjects);

  return (
    <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #eee" }}>
      <h4 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>3D Text Tools</h4>
      
      <button
        onClick={() => dispatch(addText())}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "15px"
        }}
      >
        + Add 3D Text
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {textObjects.map((txt) => (
          <div key={txt.id} style={{ padding: "10px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "4px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", fontWeight: "bold", color: "#666" }}>Text ID: {String(txt.id).slice(-4)}</span>
              <button 
                onClick={() => dispatch(removeText(txt.id))}
                style={{ border: "none", background: "none", color: "red", cursor: "pointer", fontSize: "12px" }}
              >
                Remove
              </button>
            </div>
            
            <input
              type="text"
              value={txt.text}
              onChange={(e) => dispatch(updateText({ id: txt.id, data: { text: e.target.value } }))}
              style={{ width: "100%", padding: "5px", marginBottom: "8px", border: "1px solid #ccc", borderRadius: "3px" }}
              placeholder="Enter text..."
            />

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="color"
                value={txt.color}
                onChange={(e) => dispatch(updateText({ id: txt.id, data: { color: e.target.value } }))}
                style={{ width: "30px", height: "30px", border: "none", cursor: "pointer" }}
              />
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "10px", display: "block" }}>Size</label>
                <input
                  type="range"
                  min="0.05"
                  max="0.3"
                  step="0.01"
                  value={txt.fontSize}
                  onChange={(e) => dispatch(updateText({ id: txt.id, data: { fontSize: parseFloat(e.target.value) } }))}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div style={{ marginTop: "8px", display: "flex", gap: "10px" }}>
               <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "10px", display: "block" }}>X Position</label>
                  <input
                    type="range"
                    min="-0.2"
                    max="0.2"
                    step="0.01"
                    value={txt.x}
                    onChange={(e) => dispatch(updateText({ id: txt.id, data: { x: parseFloat(e.target.value) } }))}
                    style={{ width: "100%" }}
                  />
               </div>
               <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "10px", display: "block" }}>Y Position</label>
                  <input
                    type="range"
                    min="0.2"
                    max="0.6"
                    step="0.01"
                    value={txt.y}
                    onChange={(e) => dispatch(updateText({ id: txt.id, data: { y: parseFloat(e.target.value) } }))}
                    style={{ width: "100%" }}
                  />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
