import { MAKE_TURN, PUT_SHIP, TAKE_BEAT } from '../types/game.types';

export const putShip = (myField)=>({
    type: PUT_SHIP,
    payload: myField
  });

export const makeTurn = (enemyField) => ({
    type: MAKE_TURN,
    payload: enemyField
  });

export const takeBeat = (myField)=>({
    type: TAKE_BEAT,
    payload: myField
  });
