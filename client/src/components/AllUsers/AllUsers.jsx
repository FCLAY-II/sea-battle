import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/socket.context';
import Players from '../Players/Players';
import './styles.css';

export default function AllUsers() {
  const user = useSelector((state) => state.user);
  const { fetchSender, descriptors } = useSocket();
  const [players, setPlayers] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const timeId = setTimeout(
      () => {
        fetchSender(descriptors.allUsers(setPlayers, input));
      },
      input === '' ? 0 : 400
    );

    return () => clearTimeout(timeId);
  }, [input]);
  console.log(players);

  return (
    <>
      <div className="container mt-0">
        <div style={{ margin: 'auto', marginTop: '1rem' }}>
          <p>
            <input
              className="form-control me-2"
              type="search"
              aria-label="Search"
              placeholder="найти соперника"
              onChange={(e) => setInput(e.target.value)}
            />
          </p>
          <b>Все игроки:</b>{' '}
        </div>
        
      </div>
      <div className="playerdiv">
        {players
          .filter((usr) => usr.login !== user.login)
          .map((player) => (
            <Players key={player.id} player={player} />
          ))}
      </div>
      </>
  );
}
