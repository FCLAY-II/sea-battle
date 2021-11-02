import React from 'react';

export default function Players({ player, idx }) {
  return (
    <div>
      <li>
        {idx + 1}.&nbsp; <b>Email:</b>&nbsp;{player.email}{' '}
      </li>
    </div>
  );
}
