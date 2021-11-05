/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSocket } from '../../contexts/socket.context';
import styles from './styles.module.css';

function SentInvites({ invites }) {

  const { fetchSender, descriptors } = useSocket();

  console.log(invites);
  
  return (
    <div className={styles.ff}>
      <b>Отправленные приглашения:</b>
      {invites.map((invite) => (
       <div key={invite.id} className={styles.invite}>
        <span>{`${invite.login}`}</span>
        <button
          type="button"
          className="btn btn-success btn-outline-success-none active ms-4 me-2 lg"
          onClick={() => {
            console.log('cancel clicked');
            fetchSender(
              descriptors.deleteInvitation(invite.Invite.id)
            );
          }}
         />
        {/* <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            // fetchSender(descriptors.deleteInvitation(invite.id));
          }}
        >
          🗑
        </button> */}
      </div>
      ))}
    </div>
  );
}

export default SentInvites;