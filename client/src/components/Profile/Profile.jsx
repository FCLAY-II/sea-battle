/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/socket.context';
import './profile.css';

function Profile() {
  const userInvitesCount = useSelector((state) => state.user.receivedInvitesCount);
  const userLogin = useSelector((state) => state.user.login);
  const { fetchSender, descriptors } = useSocket();
  const [invites, setInvites] = useState([]);
  const [statistic, setStatistic] = useState({});
  // const [clicked, setClicked] = useState(false);

  useEffect(() => {
    fetchSender(descriptors.getReceivedInvites(setInvites)).then(() =>
      fetchSender(descriptors.getStatistic(setStatistic))
    );
  }, [userInvitesCount]);

  return (
    <div className="ff">
      <div className="profile">
        <div className="insd">
          <div className="topfi">{userLogin}</div>
          <div className="downfr">
            <div className="left">
              <div className="ritop">
                <p className="txt">
                  <b>Ваши приглашения:</b>
                </p>
              </div>
              {invites.map((invite) => (
                <div key={invite.id} className="invite">
                  <p>{`Приглашение от ${invite.login}`}</p>
                  <div
                    type="button"
                    className="btn-group ntf"
                    aria-label="Basic checkbox toggle button group"
                    onClick={() => {
                      console.log('confirm clicked');
                      fetchSender(
                        descriptors.confirmInvitation(invite.Invite.id)
                      );
                    }}
                  >
                    <label
                      className="btn btn-outline-primary"
                      // htmlFor="btncheck3"
                    >
                      Принять приглашение
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-primary mx-2"
                    onClick={() => {
                      fetchSender(descriptors.deleteInvitation(invite.Invite.id));
                    }}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
            <div className="right">
              <p className="txt">
                <b> Статистика игрока: </b>
              </p>
              <div className="d-flex mb-3">
                <div>
                  <ul>
                    <li className="list-item">
                      <b>Количество игр: {statistic.gamesCount}</b>
                    </li>
                    <hr />
                    <li className="list-item">
                      <b>Победы: {statistic.victoriesCount}</b>
                    </li>
                    <hr />
                    <li className="list-item">
                      <b>Поражения: {statistic.failCount}</b>
                    </li>
                    <hr />
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

export default Profile;
