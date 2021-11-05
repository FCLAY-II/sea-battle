import React from 'react';
import { useSocket } from '../../contexts/socket.context';

export default function Players({ player }) {
  const { fetchSender, descriptors } = useSocket();

  return (
    <div className="itemPlayers">
      <b className="usrlogin">{player.login}</b>
      <button
        onClick={(e) => {
          fetchSender(descriptors.createInvitation(+e.target.dataset.id));
        }}
        data-id={player.id}
        type="button"
        className="btnInvite btn btn-outline-primary btn-sm "
      >
        Пригласить
      </button>
    </div>
  );
}
