import React from 'react';
import { useSelector } from 'react-redux';
// import { Droppable } from 'react-beautiful-dnd';
import Ship from '../Ship/Ship';

export default function Ships({ ships, setShip }) {
  return (
    // <Droppable>
    <div className="ships">
      {ships.map((ship) => <Ship size={ship} />)}
    </div>
    // </Droppable>
  );
}
