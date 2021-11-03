import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useGameContext } from '../../contexts/game.context';
import { useSocket } from '../../contexts/socket.context';
import gameAC from '../../redux/actionCreators/gameAC';
import Ships from '../Ships/Ships';


export default function MyField() {

  const [ships, setShips] = useState([
    4,
    3, 3,
    2, 2, 2,
    1, 1, 1, 1
  ]);

  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const { makeField, putShip } = useGameContext();
  const currStateOfMyField = game.field;
  const field = makeField(currStateOfMyField);
  const { fetchSender, descriptors } = useSocket();
  const [buttonState, setButtonState] = useState('visible');
  // const dispatch = useDispatch();

  // const onDragEnd = result =>{
  // };

  return (
    // <DragDropContext onDragStart onDragUpdate onDragEnd={onDragEnd}>

    <div
      onClick={(e) => {
        if ('cell' in e.target.dataset && game.status === 'preparation') {
          putShip(game.field, e.target.id.toString());
        }
      }}

      className="myside">
      {/* <Droppable > */}
      <div id="myfield" className="field">
        {game.status === 'pending' ? <div>ждем, пока противник расставит свои корабли</div> : <></>}
        <h1>Моё поле</h1>
        {field.map((item) => item)}
      </div>
      {/* </Droppable> */}
      {/* <Ships /> */}
      <Ships ships={ships} setShips={setShips} />
      {game.status !== 'active' && game.status !== 'finished' && buttonState === 'visible' ? <button type="button"
        onClick={() => {
          fetchSender(descriptors.confirmShips(game.field));
          dispatch(gameAC.changeStatus('pending'));
          setButtonState('unvisible');
        }}
      >Готов к игре</button> : <></>}
      <div>{game.currentPlayerId === user.id ? <p> сейчас ваш ход</p> : <p> ждем, пока сходит {game.enemy.login}</p>}</div>
    </div>
    // </DragDropContext>
  );
}
