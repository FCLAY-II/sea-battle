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
        <b> Статистика игрока: </b>
        {user.login}{' '}
      </p>
      <div className="d-flex mb-3">
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
          </ul>
        </div>
        <div style={{marginLeft: '4%'}}>
          <b>Все игроки:</b>{' '}
          {players
            .filter((us) => us.login !== user.login)
            .map((player) => (
              <Players player={player} key={player.id}/>
            ))}
        </div>
      </div>
    </div>
  );
}
