import { useSocket } from '../../../contexts/socket.context';

function SurrenderButton({ surrender, setSurrender }) {

  const { fetchSender, descriptors} = useSocket();

  return (
    <button
      className="btnInvite
      btn
      btn-outline-primary
      btn-lg"
      type="button"
      onClick={() => {
        if (!surrender) {
          fetchSender(descriptors.finishGame());
          setSurrender(true);
        }
      }}
    >
      Сдаться
    </button>
  );
}

export default SurrenderButton;