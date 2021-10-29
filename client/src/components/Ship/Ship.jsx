import React from 'react';
import { useGameContext } from '../../contexts/game.context';

export default function Ship({ size }) {

  const { makeShip } = useGameContext();
  const ship = makeShip(size);

  return (
    <div className="ship">
      {ship.map(item => item)}
    </div>
  );
}

