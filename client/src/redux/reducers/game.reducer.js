import { LOAD_GAME, MAKE_TURN, PUT_SHIP, TAKE_BEAT } from '../types/game.types';

function gameReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_GAME:
      return action.payload;
    case MAKE_TURN:
      return {
        ...state,
        enemyField: action.payload
      };
      case TAKE_BEAT:
        return {
          ...state,
          myField: action.payload
        };
        case PUT_SHIP:
          return {
            ...state,
            myField: action.payload
          };
    default:
      return state;
  }
}

export default gameReducer;
