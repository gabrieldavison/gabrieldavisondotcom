export const loadBrush = (eventBus, brush) => {
    eventBus.subscribe("draw", brush.draw);
    eventBus.subscribe("down", brush.start);
    eventBus.subscribe("up", brush.stop);
    eventBus.subscribe("pressure", brush.setPressure);
};
