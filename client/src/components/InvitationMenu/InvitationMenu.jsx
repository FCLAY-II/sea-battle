import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../contexts/socket.context';
import AllUsers from '../AllUsers/AllUsers';
import SentInvites from '../SentInvites/SentInvites';

export default function Invites() {

  const sentInvitesCount =  useSelector((state) => state.user.sentInvitesCount);
  const [sentInvites, setSentInvites] = useState([]);
  const { fetchSender, descriptors } = useSocket();
  
  useEffect(() => {
    fetchSender(descriptors.getSentInvites(setSentInvites));
  }, [sentInvitesCount]);

  return (
    <div className="invitation">
      {sentInvites.length ? (
        <>
          <SentInvites invites={sentInvites} />
          <hr />
        </>
      ) : (
        null
      )}
      <AllUsers/>
    </div>
  );
}

