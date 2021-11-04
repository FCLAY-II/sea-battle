import React from 'react';
import { useSocket } from '../../contexts/socket.context';

export default function Players({ player }) {
  const { fetchSender, descriptors } = useSocket();

  return (
    <div className="userslogin">
      <div>
        <ul>
          <li className="list-item">{player.login} &nbsp;</li>
        </ul>
      </div>

      <button
        onClick={(e) => {
          fetchSender(descriptors.createInvitation(+e.target.dataset.id));
        }}
        data-id={player.id}
        type="button"
        className="btn btn-outline-primary btn-sm"
      >
        Пригласить в игру
      </button>
    </div>
  );
}
