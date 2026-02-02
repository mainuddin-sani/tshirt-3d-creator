import FabricCanvas from "../components/fabric/FabricCanvas";
import SideSelector from "../components/fabric/SideSelector";
import TextToolbar from "../components/fabric/TextToolbar";
import ThreeTextControls from "../components/three/ThreeTextControls";
import TshirtScene from "../components/three/TshirtScene";
import TshirtSelector from "../components/tshirt/TshirtSelector";

export default function EditorPage() {
  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f0f2f5" }}>
      {/* LEFT TOOLS */}
      <div style={{ width: 300, backgroundColor: "#fff", borderRight: "1px solid #ddd", padding: "20px", display: "flex", flexDirection: "column" }}>
        <h2 style={{ marginBottom: "20px" }}>T-Shirt Designer</h2>
        <TshirtSelector />
        <hr style={{ width: "100%", margin: "20px 0", border: "0", borderTop: "1px solid #eee" }} />
        <SideSelector />
        <TextToolbar />
        <ThreeTextControls />
      </div>

      {/* CENTER CANVAS */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <FabricCanvas />
      </div>

      {/* RIGHT 3D */}
      <div style={{ width: 450, backgroundColor: "#fff", borderLeft: "1px solid #ddd", position: "relative" }}>
        <div style={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}>
          <h3 style={{ margin: 0 }}>3D Preview</h3>
        </div>
        <TshirtScene />
      </div>
    </div>
  );
}
