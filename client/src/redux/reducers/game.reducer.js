import { CHANGE_STATUS, LOAD_GAME, PUT_SHIP, UPDATE_ENEMY } from '../types/game.types';

function gameReducer(game = {}, action) {
  switch (action.type) {
    case LOAD_GAME:
      return {...action.payload, 
      ships: [...game.ships]};
    case PUT_SHIP:
      return {
        ...game,
        field: action.payload,
      };
    case UPDATE_ENEMY:
      return {
        ...game,
        enemy: {
          ...game.enemy,
          ...action.payload,
        },
      };
    case CHANGE_STATUS:
      return {
        ...game,
        status: action.payload
      };
    default:
      return game;
  }
}

export default gameReducer;
