export const dc1 = "cursor(ctx).rect(1,150,20)";
export const dc2 = "cursor(ctx).rect(1,20,20).newCursor(childCursor(ctx,10,-20).rect(10,1).newCursor(childCursor(ctx,20,40).rect(10,1)))";
export const dc3 = "cursor(ctx).rect(1,200,20,1).rotate(1)";
export const dc4 = "cursor(ctx).newCursor(Array(10).fill(true).map(() => childCursor(ctx,window.randBetween(-2,2),window.randBetween(-100,100)).rect(1,1,1)))";
