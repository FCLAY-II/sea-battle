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
        <div>
          <p>вам пришло приглашение</p>
        </div>
        <div>
          <button 
            type="button" 
            onClick={()=>setModalShowed(false)}
          >
            x
          </button>
        </div>
      </div>
    )}
    </>
  );
}
