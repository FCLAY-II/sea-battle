import { MAKE_TURN, PUT_SHIP, TAKE_BEAT } from "../types/game.types"

export const putShip = (myField)=>{
  return {
    type: PUT_SHIP,
    payload: myField
  }
}

export const makeTurn = (enemyField) => {
  return {
    type: MAKE_TURN,
    payload: enemyField
  }
}

export const takeBeat = (myField)=>{
  return{
    type: TAKE_BEAT,
    payload: myField
  }
}
