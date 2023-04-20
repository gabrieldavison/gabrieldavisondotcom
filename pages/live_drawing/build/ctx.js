const canvas = document.getElementById("drawing-canvas");
const canvasContext = canvas.getContext("2d");
const scratchCanvas = document.getElementById("scratch-canvas");
const scratchCanvasContext = scratchCanvas.getContext("2d");
canvasContext.canvas.width = window.innerWidth;
canvasContext.canvas.height = window.innerHeight;
canvasContext.fillStyle = "white";
canvasContext.fillRect(0, 0, canvas.width, canvas.height);
scratchCanvasContext.canvas.width = window.innerWidth;
scratchCanvasContext.canvas.height = window.innerHeight;
const store = {
    canvas,
    canvasContext,
    drawing: false,
    mouseX: 0,
    mouseY: 0,
    keyHeld: {},
    keyDown: "",
    keyUp: "",
    frameCount: 0,
    brushX: 0,
    brushY: 0,
    pressure: 1,
    scratchCanvasContext,
};
export const getContext = () => {
    return store;
};
export const setContext = (ctx) => {
    Object.assign(store, ctx);
};
export const saveCanvas = () => {
    const link = document.createElement("a");
    link.setAttribute("download", ".png");
    const date = new Date();
    const ctx = getContext();
    link.setAttribute("href", ctx.canvas.toDataURL(`png`).replace("image/png", "image/octet-stream"));
    link.setAttribute("download", `${date.toLocaleDateString()}-${date.toLocaleTimeString()}.png`);
    link.click();
};
export const clearCanvas = () => {
    const ctx = getContext();
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = "black";
};
export const clearScratchCanvas = () => {
    scratchCanvasContext.fillStyle = "white";
    scratchCanvasContext.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);
};
