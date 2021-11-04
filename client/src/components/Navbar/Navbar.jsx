import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userAC from '../../redux/actionCreators/userAC';
import style from './navBar.css';

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [nav, setNav] = useState();

  return (
    <header className="opt">
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/play">Играть</Link>

        {!user.login ? (
          <>
            <Link to="/login">Авторизоваться</Link>
            <Link to="/register">Зарегистрироваться</Link>
          </>
        ) : (
          <>
            <Link to="/profile">{user.login}</Link>
            <Link
              onClick={() => {
                dispatch(userAC.logout());
              }}
              to="/"
            >
              Выйти
            </Link>
          </>
        )}
        <div className="animation start-home" />
      </nav>
    </header>
  );
}
