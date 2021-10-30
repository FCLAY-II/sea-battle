import { LOAD_GAME, MAKE_TURN, PUT_SHIP, TAKE_BEAT } from '../types/game.types';

const gameAC = {
  putShip: (myField)=>({
    type: PUT_SHIP,
    payload: myField
  }),

  takeBeat: (myField)=>({
      type: TAKE_BEAT,
      payload: myField
    }),

  makeTurnDelivery: (enemyField) => ({
    type: MAKE_TURN,
    payload: enemyField
  }),

  makeTurn(idx) {
    return async (dispatch, getState) => {
      const { user } = getState();
    };
  },


  loadGameDelivery: (game) => ({
    type: LOAD_GAME,
    payload: game
  }),

  loadGame() {
    return async (dispatch, getState) => {
      const { user } = getState();
      const response = await fetch('http://localhost:3001/api/games/1', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      if (response.ok) {
        const game = await response.json();
        dispatch(this.loadGameDelivery(game));
      }
    };
  }
};

export default gameAC;


