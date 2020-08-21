import { gameState } from "./index";
import { OPPOSITE_DIRECTIONS, DIRECTIONS_BY_KEYS } from "./constants";

const initControls = () => {
    document.addEventListener("keydown", event => {
        event.preventDefault();
    
        const direction = DIRECTIONS_BY_KEYS[event.key];
    
        if (direction
            && gameState.direction === gameState.snake[0].direction
            && gameState.direction !== OPPOSITE_DIRECTIONS[direction]
        ) {
            gameState.direction = direction;
        }
    })
}

export default initControls;