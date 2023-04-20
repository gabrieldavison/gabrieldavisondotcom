import * as eventBus from "./eventBus.js";
import { getContext, setContext } from "./ctx.js";
import { onKeyDown, onKeyUp } from "./keyboard.js";
import { initUI } from "./ui/ui.js";
import { randBetween } from "./util.js";
// event listeners
document.addEventListener("mousedown", (e) => {
    const node = e.target;
    const tagName = node.tagName;
    if (tagName === "TEXTAREA" || tagName === "BUTTON")
        return;
    e.preventDefault();
    eventBus.publish("down");
    setContext({ drawing: true });
});
document.addEventListener("mouseup", () => {
    eventBus.publish("up");
    setContext({ drawing: false });
});
document.addEventListener("pointermove", (e) => {
    const ctx = getContext();
    setContext({
        mouseX: e.clientX - ctx.canvas.offsetLeft,
        mouseY: e.clientY - ctx.canvas.offsetTop,
        pressure: e.pressure,
    });
});
document.addEventListener("keydown", (e) => {
    const keyHeld = getContext().keyHeld;
    keyHeld[e.key] = true;
    setContext({ keyDown: e.key, keyHeld });
    eventBus.publish("keydown", getContext());
});
document.addEventListener("keyup", (e) => {
    const keyHeld = getContext().keyHeld;
    keyHeld[e.key] = false;
    setContext({ keyUp: e.key, keyHeld });
    eventBus.publish("keyup", getContext());
});
eventBus.subscribe("keydown", onKeyDown);
eventBus.subscribe("keyup", onKeyUp);
window.randBetween = randBetween;
// drawing loop
let frameCount = 0;
const drawLoop = () => {
    eventBus.publish("draw", getContext());
    frameCount += 1;
    setContext({ frameCount: getContext().frameCount + 1 });
    requestAnimationFrame(drawLoop);
};
requestAnimationFrame(drawLoop);
initUI(eventBus);
