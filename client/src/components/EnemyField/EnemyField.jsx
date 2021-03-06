import React from 'react';
import { useSelector } from 'react-redux';
import { useGameContext } from '../../contexts/game.context';

export default function EnemyField() {

  const game = useSelector((state) => state.game);

  const { makeField, makeTurn} = useGameContext();
  const currStateOfEnemyField = game.enemy.field.split('');
  const field = makeField(currStateOfEnemyField);
  
  return (
    <div
      onClick={(e) => {
        if ('cell' in e.target.dataset) {
          makeTurn(e.target.id.toString());
        }
      }}
      id="enemyfield"
      className="field"
    >
      <p className="field-title">Поле {game.enemy.login}</p>
      {field.map((item) => item)}
    </div>
  );
}
