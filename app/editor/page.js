import TshirtScene from "../components/three/TshirtScene";
import TshirtSelector from "../components/tshirt/TshirtSelector";

export default function EditorPage() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT TOOLS */}
      <div style={{ width: 260 }}>
        <TshirtSelector />
      </div>
      {/* RIGHT 3D */}
      <div style={{ width: 400 }}>
        <TshirtScene />
      </div>
    </div>
  );
}
