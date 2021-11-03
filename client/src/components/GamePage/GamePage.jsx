import React from 'react';
import { useSelector } from 'react-redux';
import Game from '../Game/Game';
import Invitation from '../Invitation/Invitation';

export default function GamePage() {
  const game = useSelector((state) => state.game);

  return (
    <>
      {game === null ? (
        <Invitation/> 
        ): (
        <Game/>
        )}
    </>
    );
  
}
