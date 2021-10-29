import React from 'react';
// import { Droppable } from 'react-beautiful-dnd';
import Ship from '../Ship/Ship';

export default function Ships() {
  return (
    // <Droppable>
    <div className="ships">
      <Ship size={1}/>
      <Ship size={1}/>
      <Ship size={2}/>
      <Ship size={2}/>
      <Ship size={3}/>
      <Ship size={4}/>
    </div>
    // </Droppable>
  );
}

