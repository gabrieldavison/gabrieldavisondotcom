export function randBetween(min, max) {
    return Math.random() * (max - min + 1) + min;
}
export const randInCircle = (radius) => {
    var angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * radius * Math.random();
    const y = Math.sin(angle) * radius * Math.random();
    return { x, y };
};
