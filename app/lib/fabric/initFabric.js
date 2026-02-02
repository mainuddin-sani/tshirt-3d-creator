import * as fabric from "fabric";
let fabricCanvas = null;

export const initFabric = (id) => {
  // If a canvas already exists for this id, return it to avoid re-initialization
  if (fabricCanvas) {
    const existingId = fabricCanvas?.lowerCanvasEl?.id;
    if (existingId === id) {
      return fabricCanvas;
    }
    // dispose previous canvas tied to a different element
    fabricCanvas.dispose();
    fabricCanvas = null;
  }

  fabricCanvas = new fabric.Canvas(id, {
    width: 500,
    height: 600,
    backgroundColor: "#ffffff",
    preserveObjectStacking: true,
  });

  return fabricCanvas;
};

export const getFabricCanvas = () => fabricCanvas;

export const disposeFabric = () => {
  if (fabricCanvas) {
    fabricCanvas.dispose();
    fabricCanvas = null;
  }
};
