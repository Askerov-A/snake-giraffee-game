import { gameState } from ".";
import { addPart } from "./character";
import { Rectangle, utils, Sprite } from "pixi.js";

export function eatFood() {
    let x = gameState.snake[0].x;
    let y = gameState.snake[0].y;

    let fx = gameState.foodPos.x;
    let fy = gameState.foodPos.y;

    if (x === fx && y === fy) {
        gameState.score++;

        addPart();

        updateFoodPos();
        updateFood();
    }
}

export function updateFoodPos() {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    while (gameState.snake.some(part => part.x === x && part.y === y)) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
    }

    gameState.foodPos = { x, y };
    console.log(gameState.foodPos);
}

export function updateFood() {
    gameState.food.x = gameState.foodPos.x * 64 + 32;
    gameState.food.y = gameState.foodPos.y * 64 + 32;
}

export function createFood() {
    const texture = utils.TextureCache["react-food.png"];

    const rectangle = new Rectangle(0, 0, 64, 64);
    texture.frame = rectangle;
    const food = new Sprite(texture);
    food.anchor.x = 0.5;
    food.anchor.y = 0.5;
    food.x = gameState.foodPos.x * 64 + 32;
    food.y = gameState.foodPos.y * 64 + 32;

    return food;
}