import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGameContext } from '../../contexts/game.context';
import { useSocket } from '../../contexts/socket.context';
import gameAC from '../../redux/actionCreators/gameAC';
import Ships from '../Ships/Ships';

export default function MyField() {
  const [ships, setShips] = useState([4, 3, 3, 2, 2, 2, 1, 1, 1, 1]);

  const game = useSelector((state) => state.game);

  const { makeField, putShip } = useGameContext();
  const currStateOfMyField = game.field;
  const field = makeField(currStateOfMyField);
  const { fetchSender, descriptors } = useSocket();
  // const [buttonState, setButtonState] = useState('visible');
  // const dispatch = useDispatch();

  return (
    <div
      onClick={(e) => {
        if ('cell' in e.target.dataset && game.status === 'preparation') {
          putShip(game.field, e.target.id.toString());
        }
      }}
      className="myside"
    >
      <div id="myfield" className="field">
        {game.status === 'pending' ? (
          <div>ждем, пока противник расставит свои корабли</div>
        ) : (
          <></>
        )}
        <p className="field-title">Моё поле</p>
        {field.map((item) => item)}
      </div>

      {game.status === 'preparation' ? (
        <>
          <Ships ships={ships} setShips={setShips} />
          <button
            className="btnInvite
              btn
              btn-outline-primary
              btn-sm"
            type="button"
            onClick={() => {
              fetchSender(descriptors.confirmShips(game.field));
              // setButtonState('unvisible');
            }}
          >
            Готов к игре
          </button>
        </>
      ) : null}
    </div>
  );
}
