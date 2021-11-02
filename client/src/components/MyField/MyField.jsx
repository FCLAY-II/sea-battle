import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useGameContext } from '../../contexts/game.context';
import { useSocket } from '../../contexts/socket.context';
import gameAC from '../../redux/actionCreators/gameAC';
import Ships from '../Ships/Ships';


export default function MyField() {

  const game = useSelector((state) => state.game);
  const { makeField, putShip } = useGameContext();
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
        putShip(game.field, e.target.id.toString());
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
    {game.status !== 'active' ? <button type="button"
      onClick={() => fetchSender(descriptors.confirmShips(game.field))}
    >готов к игре</button> : <></>}
  </div>
    // </DragDropContext>
  );
}
