import { useSocket } from '../../contexts/socket.context';
import styles from './styles.module.css';

export default function InvitationModal() {

  const { modalShowed, setModalShowed } = useSocket();

  return (
    <>
    {!modalShowed ? (
      <></>
    ) : (
      <div className={styles.modal}>
        <p>вам пришло приглашение</p>
        <button type="button" onClick={()=>setModalShowed(false)}
        >x</button>
      </div>
    )}
    </>
  );
}
