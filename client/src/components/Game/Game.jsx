import React from 'react';
import EnemyField from '../EnemyField/EnemyField';
import MyField from '../MyField/MyField';
// import Ships from '../Ships/Ships';




export default function Game() {

  return (
    <div className="game">
      
      <MyField/>
      <EnemyField/>
      
    </div>
  );
}

