import React from 'react';
import { useSocket } from '../../contexts/socket.context';

export default function Players({ player }) {
  const { fetchSender, descriptors } = useSocket();

  return (
    <div>
      <li>
        <b>Логин:</b>&nbsp;{player.login}{' '}
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
      </li>
    </div>
  );
}
