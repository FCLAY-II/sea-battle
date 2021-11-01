import React from 'react';
import { useGameContext } from '../../contexts/game.context';
// import { Droppable } from 'react-beautiful-dnd';
import Ship from '../Ship/Ship';

export default function Ships() {
  const { game } = useGameContext();
  const shipsArr = game.ships;
  return (
    // <Droppable>
    <div className="ships">
      {shipsArr.map((ship) => <Ship size={ship} />)}
    </div>
    // </Droppable>
  );
}

