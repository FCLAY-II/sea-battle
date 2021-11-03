import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/socket.context';
import Players from '../Players/Players';

export default function AllUsers() {
  const user = useSelector((state) => state.user);
  const { fetchSender, descriptors } = useSocket();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchSender(descriptors.allUsers(setPlayers));
  }, []);

  return (
    <div style={{ marginLeft: '4%' }}>
      <b>Все игроки:</b>{' '}
      {players
        .filter((usr) => usr.login !== user.login)
        .map((player) => (
          <Players player={player} key={player.id} />
        ))}
    </div>
  );
}
