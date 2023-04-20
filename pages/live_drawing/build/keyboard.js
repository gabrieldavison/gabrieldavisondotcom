import { clearScratchCanvas } from "./ctx.js";
export const onKeyDown = (ctx) => {
    const callbacks = {
        // i: () =>
        //   document.getElementById("image-container")?.classList.toggle("hide"),
        // a: () => console.log("hello"),
        // s: () => saveCanvas(),
        Escape: () => {
            var _a, _b, _c;
            (_a = document.getElementById("ui")) === null || _a === void 0 ? void 0 : _a.classList.toggle("hide");
            (_b = document.getElementById("buttonShow")) === null || _b === void 0 ? void 0 : _b.classList.toggle("hide");
            (_c = document.getElementById("buttonHide")) === null || _c === void 0 ? void 0 : _c.classList.toggle("hide");
        },
    };
    const callback = callbacks[ctx.keyDown];
    if (callback !== undefined)
        callback();
};
export const onKeyUp = (ctx) => {
    const callbacks = {
        " ": clearScratchCanvas,
    };
    const callback = callbacks[ctx.keyUp];
    if (callback !== undefined)
        callback();
};
