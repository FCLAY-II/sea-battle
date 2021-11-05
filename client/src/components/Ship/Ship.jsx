import React from 'react';
import { useGameContext } from '../../contexts/game.context';

export default function Ship({ size }) {
  const { makeShip } = useGameContext();
  const ship = makeShip(size);

  return <div className="d-flex mx-2">{ship.map((item) => item)}</div>;
}
