import React from 'react';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useGameContext } from '../../contexts/game.context';
import Ships from '../Ships/Ships';


export default function MyField() {


  const { makeField, game } = useGameContext();
  const currStateOfMyField = game.field;
  const field = makeField(currStateOfMyField);

  // const onDragEnd = result =>{
  // };

  return (
    // <DragDropContext onDragStart onDragUpdate onDragEnd={onDragEnd}>

    <div className="myside">
      {/* <Droppable > */}
      <div id="myfield" className="field">
        <button type="button" className="btn btn-outline-primary">
          Готов
        </button>
        <h1>my field</h1>
        {field.map((item) => item)}
      </div>
      {/* </Droppable> */}
      <Ships />
    </div>
    // </DragDropContext>
  );
}
