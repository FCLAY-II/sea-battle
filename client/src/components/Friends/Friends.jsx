import React from 'react';

export default function Friends({ friend, idx }) {
  return (
    <div>
      <li>
        {idx + 1}.&nbsp; <b>Email:</b>&nbsp;{friend.email}{' '}
        <button type="button" className="btn btn-outline-primary btn-sm">
          Пригласить
        </button>
      </li>
    </div>
  );
}
