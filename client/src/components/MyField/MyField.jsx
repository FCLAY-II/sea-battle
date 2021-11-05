import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGameContext } from '../../contexts/game.context';
import { useSocket } from '../../contexts/socket.context';

export default function MyField() {

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
        if ('cell' in e.target.dataset && (game.status === 'preparation' || game.status === 'awaiting')) {
          putShip(game.field, e.target.id.toString());
        }
      }}
      className="myside"
    >
      <div id="myfield" className="field">
        <p className="field-title">Моё поле</p>
        {field.map((item) => item)}
      </div>
    </div>
  );
}
