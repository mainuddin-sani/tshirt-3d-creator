"use client";

import {
  setActiveTshirt,
  setTshirtColor,
} from "@/app/features/editor/editorSlice";
import { useDispatch, useSelector } from "react-redux";

export default function TshirtSelector() {
  const dispatch = useDispatch();
  const tshirts = useSelector((s) => s.editor.tshirt.list);
  const activeId = useSelector((s) => s.editor.tshirt.activeId);

  const activeTshirt = tshirts.find((t) => t.id === activeId);

  return (
    <div style={{ padding: 10 }}>
      <h4>T-Shirt</h4>

      {tshirts.map((t) => (
        <button
          key={t.id}
          style={{
            display: "block",
            marginBottom: 6,
            background: t.id === activeId ? "#ddd" : "#fff",
          }}
          onClick={() => dispatch(setActiveTshirt(t.id))}
        >
          {t.name}
        </button>
      ))}

      <label>
        Color
        <input
          type="color"
          value={activeTshirt.color}
          onChange={(e) => dispatch(setTshirtColor(e.target.value))}
        />
      </label>
    </div>
  );
}
