import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const user = useSelector((state) => state.user);
  return (
    <div className="profile">
       <p> Статистика игрока: {user.login} </p>
      <hr />
      <ul>
        <li>Количество игр:</li>
        <li>Победы:</li>
        <li>Поражения:</li>
      </ul>
    </div>
  );
}
