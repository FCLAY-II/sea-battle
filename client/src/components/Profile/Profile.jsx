import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/socket.context';
import Players from '../Players/Players';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [players, setPlayers] = useState([]);
  const { fetchSender, descriptors } = useSocket();

  useEffect(() => {
    fetchSender(descriptors.allUsers(setPlayers));
  }, [fetchSender, descriptors]);

  return (
    <div className="profile">
      <p>
        <b>
          <button type="button" className="btn btn-outline-primary btn-lg">
            Создать игру
          </button>
        </b>
      </p>
      <p>
        <b> Статистика игрока: </b>
        {user.login}{' '}
      </p>
      <div className="card" style={{ width: '18rem' }}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Количество игр:</b>
          </li>
          <li className="list-group-item">
            <b>Победы:</b>
          </li>
          <li className="list-group-item">
            <b>Поражения:</b>
          </li>
          <li className="list-group-item">
            <b>Друзья:</b>{' '}
            {players
              .filter((us) => us.login !== user.login)
              .map((player, idx) => (
                <Players player={player} key={player.id} idx={idx} />
              ))}
          </li>
        </ul>
      </div>
    </div>
  );
}
