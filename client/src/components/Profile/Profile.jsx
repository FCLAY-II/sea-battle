import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/socket.context';
import './profile.css';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const { fetchSender, descriptors } = useSocket();
  const [invites, setInvites] = useState([]);
  const [statistic, setStatistic] = useState({});

  useEffect(() => {
    fetchSender(descriptors.getReceivedInvites(setInvites));
    fetchSender(descriptors.getStatistic(setStatistic));
  }, []);
  console.log(statistic);

  return (
    <div className="ff">
      <div className="profile">
        <div className="insd">
          <div className="topfi">{user.login} </div>
          <div className="downfr">
            <div className="left">
              <div className="ritop">
                <p className="txt">
                  <b>Ваши приглашения:</b>
                </p>
              </div>
              {invites.map((invite) => (
                <div className="invite">
                  <p>{invite.login}</p>
                  <button
                    onClick={() =>
                      fetchSender(
                        descriptors.confirmInvitation(invite.Invite.id)
                      )
                    }
                    type="button"
                  >
                    принять
                  </button>
                </div>
              ))}
            </div>
            <div className="right">
              <p className="txt">
                <b> Статистика игрока: </b>
              </p>
              <div className="d-flex mb-3">
                <div className="card" style={{ width: '18rem' }}>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <b>Количество игр: {statistic.gamesCount}</b>
                    </li>
                    <li className="list-group-item">
                      <b>Победы: {statistic.victoriesCount}</b>
                    </li>
                    <li className="list-group-item">
                      <b>Поражения: {statistic.failCount}</b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
