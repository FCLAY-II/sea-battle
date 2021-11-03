import React from 'react';
import { useSelector } from 'react-redux';
import Game from '../Game/Game';
import Invitation from '../Invitation/Invitation';

export default function GamePage() {
  const gameStatus = useSelector((state)=> state.game.status);


  return (
    <>
  
  {gameStatus === null ? <Invitation/> : <Game/>}
  </>
    );
  
}
