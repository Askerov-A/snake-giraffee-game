import { mod } from "./utils";
import { BODY_PARTS, DIRECTIONS } from "./constants";
import { gameState } from ".";
import { Graphics, utils, Rectangle, Sprite } from "pixi.js";

function getRotationByDirection(dir) {
    switch(dir) {
        case DIRECTIONS.RIGHT:
            return 90;
        case DIRECTIONS.BOTTOM:
            return 180;
        case DIRECTIONS.LEFT:
            return 270;
        case DIRECTIONS.TOP:
            return 0;
    }
}

function createBodyPart(type, position, direction) {
    const texture = utils.TextureCache[BODY_PARTS[type].src];

    // а тут наш любимый pixi js :)
    const rectangle = new Rectangle(0, 0, 64, 64);
    texture.frame = rectangle;
    const bodyPart = new Sprite(texture);
    bodyPart.anchor.x = 0.5;
    bodyPart.anchor.y = 0.5;
    bodyPart.angle = getRotationByDirection(direction);
    bodyPart.x = position.x * 64 + 32;
    bodyPart.y = position.y * 64 + 32;

    return bodyPart;
}

function getBodyPartType(prev, next) {
    if (!prev) {
        return "head";
    } else {
        return "body";
    }
}

export function moveSnake() {

    let x = gameState.snake[0].x;
    let y = gameState.snake[0].y;

    switch (gameState.direction) {
      case DIRECTIONS.BOTTOM:
        y = mod(10, y + 1);
        break;
      case DIRECTIONS.TOP:
        y = mod(10, y - 1);
        break;
      case DIRECTIONS.LEFT:
        x = mod(10, x - 1);
        break;
      case DIRECTIONS.RIGHT:
        x = mod(10, x + 1);
        break;
    }
    const newSnake = [{ x, y, direction: gameState.direction }];
    const snakeLength = gameState.snake.length;

    for (let i = 1; i < snakeLength; ++i) {
      newSnake.push({ ...gameState.snake[i - 1] });
    }
    gameState.snake = newSnake;
    console.log(newSnake);
}

export function createCharacter() {
    const character = new Graphics();

    return character;
}

export function updateCharacter(character, characterState) {
    const parts = characterState.map((partPos, i) => {
        const bodyPartType = getBodyPartType(characterState[i - 1], characterState[i + 1]);

        // функция которая создает каждый отдельный элемент тела
        return createBodyPart(bodyPartType, partPos, partPos.direction);
    });
    parts.map((part) => character.addChild(part));
}

export function removeAllParts(char) {
    char.children.map((part) => char.removeChild(part));
}

export function addPart() {
    let tail = gameState.snake[gameState.snake.length - 1];
    
    let direction = tail.direction;
    let x = tail.x;
    let y = tail.y;

    switch (direction) {
      case 1:
        y = mod(250, y - 10);
        break;
      case -1:
        y = mod(250, y + 10);
        break;
      case -2:
        x = mod(250, x + 10);
        break;
      case 2:
        x = mod(250, x - 10);
        break;
    }
    gameState.snake.push({ x, y, direction });
  }