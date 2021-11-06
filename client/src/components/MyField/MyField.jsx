import React from 'react';
import { useSelector } from 'react-redux';
import { useGameContext } from '../../contexts/game.context';

export default function MyField() {
  const game = useSelector((state) => state.game);

  const { makeField, putShip } = useGameContext();
  const currStateOfMyField = game.field;
  const field = makeField(currStateOfMyField);

  return (
    <div
      onClick={(e) => {
        if (
          'cell' in e.target.dataset &&
          (game.status === 'preparation' || game.status === 'awaiting')
        ) {
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
