import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/socket.context';

export default function Profile() {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [friends, setFriends] = useState([]);
  console.log(friends);
  const { fetchSender, descriptors } = useSocket();

  useEffect(() => {
    fetchSender(descriptors.allUsers(setFriends));
  }, [fetchSender, descriptors]);

  return (
    <div className="profile">
       <p> Статистика игрока: {user.login} </p>
      <hr />
      <ul>
        <li>Количество игр:</li>
        <li>Победы:</li>
        <li>Поражения:</li>
        <li>
          Друзья:{' '}
          {friends
            .filter((us) => us.login !== user.login)
            .map((el) => el.email)}
        </li>
      </ul>
    </div>
  );
}
