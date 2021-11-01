import React from 'react';
import { useDispatch } from 'react-redux';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useGameContext } from '../../contexts/game.context';
import { useSocket } from '../../contexts/socket.context';
import gameAC from '../../redux/actionCreators/gameAC';
import Ships from '../Ships/Ships';


export default function MyField() {


  const { makeField, game, putShip } = useGameContext();
  const currStateOfMyField = game.field;
  const field = makeField(currStateOfMyField);
  const { fetchSender, descriptors } = useSocket();
  // const dispatch = useDispatch();

  // const onDragEnd = result =>{
  // };

  return (
    // <DragDropContext onDragStart onDragUpdate onDragEnd={onDragEnd}>
    
  <div
    onClick={(e) => {
      if ('cell' in e.target.dataset) {
        putShip(e.target.id.toString());
      }
    }}

    className="myside">
    {/* <Droppable > */}
    <div id="myfield" className="field">
      <h1>my field</h1>
      {field.map((item) => item)}
    </div>
    {/* </Droppable> */}
    <Ships />
    {game.status === 'preparation' ? <button type="button"
      onClick={() => fetchSender(descriptors.confirmShips(currStateOfMyField))}
    >готов к игре</button> : <></>}
  </div>
    // </DragDropContext>
  );
}
