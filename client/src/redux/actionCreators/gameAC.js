import { LOAD_GAME, MAKE_TURN, PUT_SHIP, TAKE_BEAT } from '../types/game.types';

const gameAC = {
  putShip: (myField)=>({
    type: PUT_SHIP,
    payload: myField
  }),

  makeTurn: (enemyField) => ({
      type: MAKE_TURN,
      payload: enemyField
    }),

  takeBeat: (myField)=>({
      type: TAKE_BEAT,
      payload: myField
    }),

  loadGameDelivery: (game) => ({
    type: LOAD_GAME,
    payload: game
  }),

  loadGame() {
    return async (dispatch) => {
      const response = await fetch('http://localhost:3001/api/games/1');
      if (response.ok) {
        const game = await response.json();
        dispatch(this.loadGameDelivery(game));
      }
    };
  }
};

export default gameAC;


