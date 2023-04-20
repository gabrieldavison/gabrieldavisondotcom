import { cursor as c, childCursor as cc } from "../brushBuilder.js";
import { saveCanvas, clearCanvas } from "../ctx.js";
import { dc1, dc2, dc3, dc4 } from "./defaultCursors.js";
export const initUI = (eventBus) => {
    const buttonHide = document.getElementById("buttonHide");
    const buttonShow = document.getElementById("buttonShow");
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");
    const button4 = document.getElementById("button4");
    const buttonEval = document.getElementById("buttonEval");
    const buttonSave = document.getElementById("buttonSave");
    const buttonClear = document.getElementById("buttonClear");
    const editor = document.getElementById("editor");
    const message = document.getElementById("message");
    const savedState = localStorage.getItem("editorState");
    const editorState = savedState !== null ? JSON.parse(savedState) : [dc1, dc2, dc3, dc4];
    let currentEditorIndex = 0;
    editor.value = editorState[currentEditorIndex];
    const saveState = () => {
        editorState[currentEditorIndex] = editor.value;
        localStorage.setItem("editorState", JSON.stringify(editorState));
    };
    const switchEditorState = (bank) => {
        editor.value = editorState[bank];
        currentEditorIndex = bank;
    };
    const setMessage = (v) => {
        message.innerText = v;
    };
    const loadBrush = () => {
        // Need to define cursor here for dynamic evaluation to work
        const cursor = c;
        const childCursor = cc;
        const editorState = editor.value;
        eventBus.clearEvent("draw");
        eventBus.subscribe("draw", (ctx) => {
            try {
                const brush = eval(editorState);
                if (ctx.drawing) {
                    brush.execute();
                }
                setMessage(".");
            }
            catch {
                setMessage("unable to evaluate code");
            }
        });
    };
    editor.addEventListener("input", (e) => {
        saveState();
    });
    // This is a hack to get tab to insert a character instead of changing focus
    editor.addEventListener("keydown", (e) => {
        if (e.key == "Tab") {
            e.preventDefault();
            var start = editor.selectionStart;
            var end = editor.selectionEnd;
            // set textarea value to: text before caret + tab + text after caret
            editor.value =
                editor.value.substring(0, start) + "\t" + editor.value.substring(end);
            // put caret at right position again
            editor.selectionStart = editor.selectionEnd = start + 1;
        }
    });
    const toggleHideShow = () => {
        var _a;
        (_a = document.getElementById("ui")) === null || _a === void 0 ? void 0 : _a.classList.toggle("hide");
        buttonHide === null || buttonHide === void 0 ? void 0 : buttonHide.classList.toggle("hide");
        buttonShow === null || buttonShow === void 0 ? void 0 : buttonShow.classList.toggle("hide");
    };
    buttonHide === null || buttonHide === void 0 ? void 0 : buttonHide.addEventListener("click", toggleHideShow);
    buttonShow === null || buttonShow === void 0 ? void 0 : buttonShow.addEventListener("click", toggleHideShow);
    button1 === null || button1 === void 0 ? void 0 : button1.addEventListener("click", () => switchEditorState(0));
    button2 === null || button2 === void 0 ? void 0 : button2.addEventListener("click", () => switchEditorState(1));
    button3 === null || button3 === void 0 ? void 0 : button3.addEventListener("click", () => switchEditorState(2));
    button4 === null || button4 === void 0 ? void 0 : button4.addEventListener("click", () => switchEditorState(3));
    buttonEval === null || buttonEval === void 0 ? void 0 : buttonEval.addEventListener("click", loadBrush);
    buttonSave === null || buttonSave === void 0 ? void 0 : buttonSave.addEventListener("click", saveCanvas);
    buttonClear === null || buttonClear === void 0 ? void 0 : buttonClear.addEventListener("click", clearCanvas);
};
