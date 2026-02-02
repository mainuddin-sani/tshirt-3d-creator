"use client";

import { setSide } from "@/app/features/editor/editorSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SideSelector() {
  const dispatch = useDispatch();
  const currentSide = useSelector((s) => s.editor.currentSide);

  const style = (side) => ({
    padding: "10px 20px",
    backgroundColor: currentSide === side ? "#007bff" : "#eee",
    color: currentSide === side ? "#fff" : "#333",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    flex: 1,
    transition: "all 0.2s",
  });

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <button style={style("front")} onClick={() => dispatch(setSide("front"))}>
        FRONT
      </button>
      <button style={style("back")} onClick={() => dispatch(setSide("back"))}>
        BACK
      </button>
    </div>
  );
}
