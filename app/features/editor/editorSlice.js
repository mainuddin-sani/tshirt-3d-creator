import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSide: "front", // "front" or "back"
  frontImage: null,
  backImage: null,
  frontCanvasData: null,
  backCanvasData: null,

  textObjects: [], // { id, text, color, fontSize, x, y, side }

  tshirt: {
    activeId: "white",
    list: [
      {
        id: "white",
        name: "Classic White",
        color: "#ffffff",
        model: "/models/shirt.glb",
      },
      {
        id: "black",
        name: "Classic Black",
        color: "#111111",
        model: "/models/shirt.glb",
      },
    ],
  },
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setPreviewImage: (state, action) => {
      if (state.currentSide === "front") {
        state.frontImage = action.payload;
      } else {
        state.backImage = action.payload;
      }
    },
    setSide: (state, action) => {
      state.currentSide = action.payload;
    },
    updateCanvasData: (state, action) => {
      if (state.currentSide === "front") {
        state.frontCanvasData = action.payload;
      } else {
        state.backCanvasData = action.payload;
      }
    },
    setActiveTshirt: (state, action) => {
      state.tshirt.activeId = action.payload;
    },
    setTshirtColor: (state, action) => {
      const tshirt = state.tshirt.list.find(
        (t) => t.id === state.tshirt.activeId,
      );
      if (tshirt) tshirt.color = action.payload;
    },
    addText: (state, action) => {
      state.textObjects.push({
        id: Date.now(),
        text: "New Text",
        color: "#000000",
        fontSize: 0.1,
        x: 0,
        y: 0.4,
        side: state.currentSide,
      });
    },
    updateText: (state, action) => {
      const { id, data } = action.payload;
      const index = state.textObjects.findIndex((t) => t.id === id);
      if (index !== -1) {
        state.textObjects[index] = { ...state.textObjects[index], ...data };
      }
    },
    removeText: (state, action) => {
      state.textObjects = state.textObjects.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  setPreviewImage,
  setSide,
  updateCanvasData,
  setActiveTshirt,
  setTshirtColor,
  addText,
  updateText,
  removeText,
} = editorSlice.actions;

export default editorSlice.reducer;
