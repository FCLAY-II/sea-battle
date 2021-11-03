import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/socket.context';


export default function Profile() {
  const user = useSelector((state) => state.user);
  const { fetchSender, descriptors } = useSocket();
  const [invites, setInvites] = useState([]);


  useEffect(() => {
    fetchSender(descriptors.getReceivedInvites(setInvites));
  }, []);
  

  return (
    <div className="profile">
      <p>
        <b> Статистика игрока: </b>
        {user.login}{' '}
      </p>
      <div><h2>Ваши приглашения:</h2>
        {invites.map(invite => <div className="invite">
          <p>{invite.login}</p>
          <button onClick={() => fetchSender(descriptors.confirmInvitation(invite.Invite.id))}
            type='button'>принять</button>
        </div>)}
      </div>
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
      </div>
    </div>
  );
}
