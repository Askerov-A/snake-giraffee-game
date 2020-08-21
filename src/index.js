import { Application } from "pixi.js";
import initControls from "./controls";
import { DIRECTIONS } from "./constants";
import { moveSnake, removeAllParts, updateCharacter, createCharacter } from "./character";
import { createFood, eatFood } from "./food";

// инициализируем приложение
const app = new Application({
    backgroundColor: 0x999999,
    width: 640,
    height: 640,
    autoStart: false,
    antialias: true,
});
document.body.appendChild(app.view);

// состояние игры
export const gameState = {
    direction: DIRECTIONS.RIGHT,
    snake: [
        { x: 0, y: 0, direction: DIRECTIONS.RIGHT },
        { x: 1, y: 0, direction: DIRECTIONS.RIGHT },
        { x: 2, y: 0, direction: DIRECTIONS.RIGHT },
        { x: 3, y: 0, direction: DIRECTIONS.RIGHT },
    ],
    foodPos: { x: 3, y: 3 },
    score: 0,
    character: null,
    food: null,
}

let start = 0;

// основной процесс игры
function gameLoop(timestamp) {
    start++;
    
    if (timestamp - start > 300) {
        removeAllParts(gameState.character);

        // в зависимости от того куда указывает state.direction
        // змея двигается
        moveSnake();

        // если в этот момент он наплывает на еду
        // он её съедает
        eatFood();

        const character = gameState.character;

        // все функции выше - изменяют main state
        // тут же мы в зависимости от изменений
        // перерендериваем нашего жирафа
        updateCharacter(character, gameState.snake);
        app.renderer.render(app.stage);
        start = timestamp;
    }

    // 60 раз в секунду
    // рендерится каждый следующий фрейм
    requestAnimationFrame(gameLoop);
}

// первоначальная инициализация приложения
function setup() {
    gameState.character = createCharacter();
    gameState.food = createFood();
    app.stage.addChild(gameState.character);
    app.stage.addChild(gameState.food);
    requestAnimationFrame(gameLoop);
    initControls();

    app.renderer.render(app.stage);
}

// лоадер текстур
app.loader.add("head.png").add("body.png").add("react-food.png").load(setup);