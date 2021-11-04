import { useDispatch, useSelector } from 'react-redux';
import userAC from '../../redux/actionCreators/userAC';

import styles from './styles.module.css';

export default function InvitationModal() {
const invitesCount = useSelector((state)=> state.user?.invitesCount);
const dispatch = useDispatch();

  return (
    <>
    {invitesCount === undefined || invitesCount === 0 ? (
      <></>
    ) : (
      <div className={styles.modal}>
        <p>вам пришло приглашение</p>
        <button type="button" onClick={()=>dispatch(userAC.removeInvite())}
        >x</button>
      </div>
    )}
    </>
  );
}
