const r = require("raylib");
const perlin = require("perlin-noise");

function setup() {
    const world = {
        grid: {
            height: 100,
            width: 100,
        },
        cellSide: 10,
        palette: {
            0: r.DARKBLUE,
            1: r.BLUE,
            2: r.BEIGE,
            3: r.LIME,
            4: r.DARKGREEN,
            5: r.DARKGRAY,
            6: r.RAYWHITE,
        },
    };

    world.windowWidth = world.cellSide * world.grid.width;
    world.windowHeight = world.cellSide * world.grid.height;

    world.noise = perlin.generatePerlinNoise(
        world.grid.width,
        world.grid.height,
    );

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.windowWidth, world.windowHeight, "2d Terrain Generation");
    r.SetTargetFPS(10);

    return world;
}

function getColor(world, noise) {
    return world.palette[Math.floor(noise * 7)];
}

function drawPerlinNoise(world) {
    for (let i = 0; i < world.grid.height; i++) {
        for (let j = 0; j < world.grid.width; j++) {
            const posX = j * world.cellSide;
            const posY = i * world.cellSide;

            const index = world.grid.width * i + j;
            const color = getColor(world, world.noise[index]);

            r.DrawRectangle(posX, posY, world.cellSide, world.cellSide, color);
        }
    }
}

function isRunning() {
    return !r.WindowShouldClose();
}

function draw(world) {
    r.BeginDrawing();

    drawPerlinNoise(world);

    r.EndDrawing();
}

function update(world) {}

function tearDown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    isRunning,
    draw,
    update,
    tearDown,
};
