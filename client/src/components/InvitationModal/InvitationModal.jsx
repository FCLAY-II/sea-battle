import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import userAC from '../../redux/actionCreators/userAC';

export default function InvitationModal() {
const invitesCount = useSelector((state)=> state.user.invitesCount);
const dispatch = useDispatch();

  return (
    <>
    {invitesCount === 0 ? <></> : <div  className="modal">
      <p>вам пришло приглашение</p>
      <button type="button" onClick={()=>dispatch(userAC.removeInvite())}
      >закрыть</button>
    </div>}
    </>
  );
}
