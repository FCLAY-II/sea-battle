import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/socket.context';
import Friends from '../Friends/Friends';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [friends, setFriends] = useState([]);
  const { fetchSender, descriptors } = useSocket();

  useEffect(() => {
    fetchSender(descriptors.allUsers(setFriends));
  }, [fetchSender, descriptors]);

  return (
    <div className="profile">
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
            {friends
              .filter((us) => us.login !== user.login)
              .map((friend, idx) => (
                <Friends friend={friend} key={friend.id} idx={idx} />
              ))}
          </li>
        </ul>
      </div>
    </div>
  );
}
