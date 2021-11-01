import React from 'react';
import { useGameContext } from '../../contexts/game.context';
import EnemyField from '../EnemyField/EnemyField';
import MyField from '../MyField/MyField';




export default function Game() {

  const game = useGameContext();
  return (
    <div className="game">
      
      <MyField/>
      {game.status === 'active'? <EnemyField/> : <></>}
      
    </div>
  );
}

