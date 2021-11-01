import React from 'react';
import { useDispatch } from 'react-redux';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useGameContext } from '../../contexts/game.context';
import gameAC from '../../redux/actionCreators/gameAC';
import Ships from '../Ships/Ships';


export default function MyField() {


  const { makeField, game } = useGameContext();
  const currStateOfMyField = game.field;
  const field = makeField(currStateOfMyField);
  const dispatch = useDispatch();

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
      {game.status === 'preparation' ? <button type="button"
        onClick={() => dispatch(gameAC.changeStatus('pending'))}
      >готов к игре</button> : <></>}
    </div>
    // </DragDropContext>
  );
}
