import { useSelector } from 'react-redux';

export default function Profile() {
  const user = useSelector((state) => state.user);

  return (
    <div className="profile">
      <p>
        <b> Статистика игрока: </b>
        {user.login}{' '}
      </p>
      <div className="d-flex mb-3">
        <div className="card" style={{ width: '18rem' }}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Количество игр:</b>
            </li>
            <li className="list-group-item">
              <b>Победы:</b>
            </li>
            <li className="list-group-item">
              <b>Поражения:</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
