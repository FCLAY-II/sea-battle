import React from 'react';
import { useSelector } from 'react-redux';
import Game from '../Game/Game';
import InvitationMenu from '../InvitationMenu/InvitationMenu';

export default function GamePage() {
  const game = useSelector((state) => state.game);

  return (
    <div className="d-flex">
      {game === null ? (
        <InvitationMenu /> 
        ): (
        <Game/>
        )}
    </div>
    );
  
}
