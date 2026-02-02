import * as fabric from "fabric";
let fabricCanvas = null;

export const initFabric = (id, width = 500, height = 600) => {
  // If a canvas already exists for this id, return it to avoid re-initialization
  if (fabricCanvas) {
    const existingId = fabricCanvas?.lowerCanvasEl?.id;
    if (existingId === id) {
      // Update dimensions if they changed
      fabricCanvas.setDimensions({ width, height });
      return fabricCanvas;
    }
    // dispose previous canvas tied to a different element
    fabricCanvas.dispose();
    fabricCanvas = null;
  }

  fabricCanvas = new fabric.Canvas(id, {
    width,
    height,
    backgroundColor: "transparent",
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
