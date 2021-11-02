import React from 'react';
import { useSelector } from 'react-redux';
// import { Droppable } from 'react-beautiful-dnd';
import Ship from '../Ship/Ship';

export default function Ships() {
  const gameShips = useSelector((state) => state.game.ships);
  const shipsArr = gameShips;
  return (
    // <Droppable>
    <div className="ships">
      {shipsArr.map((ship) => <Ship size={ship} />)}
    </div>
    // </Droppable>
  );
}
