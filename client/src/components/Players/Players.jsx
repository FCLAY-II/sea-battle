import React from 'react';

export default function Players({ player }) {
  return (
    <div>
      <li>
        <b>Логин:</b>&nbsp;{player.login}{' '}
        <button type="button" className="btn btn-outline-primary btn-sm">
          Создать игру
        </button>
      </li>
    </div>
  );
}
