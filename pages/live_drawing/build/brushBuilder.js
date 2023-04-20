const getCurrentCanvas = (ctx) => ctx.keyHeld[" "] === true ? ctx.scratchCanvasContext : ctx.canvasContext;
const rectCommand = (ctx, width, height, alpha = 1) => {
    return {
        execute: () => {
            const c = getCurrentCanvas(ctx);
            c.fillStyle = `rgb(0,0,0,${alpha})`;
            c.beginPath();
            c.fillRect(0 - width / 2, 0 - height / 2, width, height);
            c.closePath();
        },
    };
};
class Cursor {
    constructor(ctx, offsetX = 0, offsetY = 0, rotation = 0) {
        this.ctx = {
            ...ctx,
        };
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.commands = [];
        this.rotation = rotation;
        this.isChild = false;
    }
    rect(width, height, alpha = 1, rotation = 0) {
        this.commands.push(rectCommand(this.ctx, width, height, alpha));
        return this;
    }
    rotate(amount) {
        this.rotation = amount;
        return this;
    }
    newCursor(c) {
        if (Array.isArray(c)) {
            this.commands.push(...c);
        }
        else {
            this.commands.push(c);
        }
        return this;
    }
    execute() {
        this.ctx.canvasContext.save();
        if (this.isChild) {
            this.ctx.canvasContext.translate(this.offsetX, this.offsetY);
        }
        else {
            this.ctx.canvasContext.translate(this.ctx.mouseX + this.offsetX, this.ctx.mouseY + this.offsetY);
        }
        this.ctx.canvasContext.rotate(this.rotation);
        this.commands.forEach((c) => {
            c.execute();
        });
        this.ctx.canvasContext.restore();
    }
}
class ChildCursor extends Cursor {
    constructor(ctx, offsetX = 0, offsetY = 0, rotation = 0) {
        super(ctx, offsetX, offsetY, rotation);
        this.isChild = true;
    }
}
export const cursor = (ctx, offsetX, offsetY) => new Cursor(ctx, offsetX, offsetY);
export const childCursor = (ctx, offsetX, offsetY) => new ChildCursor(ctx, offsetX, offsetY);
