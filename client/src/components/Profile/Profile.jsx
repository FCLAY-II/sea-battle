/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
    fetchSender(descriptors.getReceivedInvites(setInvites)).then(() =>
      fetchSender(descriptors.getStatistic(setStatistic))
    );
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
                  <p> Приглашение от:{invite.login}</p>
                  <div
                    className="btn-group ntf"
                    role="group"
                    aria-label="Basic checkbox toggle button group"
                    onClick={() =>
                      fetchSender(
                        descriptors.confirmInvitation(invite.Invite.id)
                      )
                    }
                  >
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="btncheck3"
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="btncheck3"
                    >
                      Принять приглашение
                    </label>
                  </div>
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
