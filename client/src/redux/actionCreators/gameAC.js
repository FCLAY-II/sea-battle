import { CHANGE_STATUS, LOAD_GAME, PUT_SHIP, UPDATE_ENEMY } from '../types/game.types';

const gameAC = {
  putShip: (myField) => ({
    type: PUT_SHIP,
    payload: myField
  }),

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
  },

  updateEnemy: (updatedEnemy) => ({
    type: UPDATE_ENEMY,
    payload: updatedEnemy
  }),

  changeStatus(status) {
    return {
      type: CHANGE_STATUS,
      payload: status
    };
  }
  
};

export default gameAC;


