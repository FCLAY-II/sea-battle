import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/socket.context';
import Players from '../Players/Players';
import './styles.css';

export default function AllUsers() {
  const user = useSelector((state) => state.user);
  const { fetchSender, descriptors } = useSocket();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchSender(descriptors.allUsers(setPlayers));
  }, []);

  return (
    <div className="gamepageclass">
      <b>Все игроки:</b>{' '}
      {players
        .filter((usr) => usr.login !== user.login)
        .map((player) => (
          <Players key={player.id} player={player} />
        ))}
    </div>
  );
}
