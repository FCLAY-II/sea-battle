import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userAC from '../../redux/actionCreators/userAC';
import style from './navBar.css';

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [nav, setNav] = useState(1);

  const hoverEl = useRef(null);

  console.log(nav);

  return (
    <header className="opt">
      <nav>
        <Link onClick={(e) => {
          // window.getComputedStyle(e.target).left;
          setNav(1);
        }} to="/welcome">Главная</Link>
        <Link onClick={() => setNav(2)} to="/play">Играть</Link>

        {!user.login ? (
          <>
            <Link onClick={(e) => {
              setNav(3);
            }} to="/login">Авторизоваться</Link>
            <Link onClick={() => setNav(4)} to="/register">Зарегистрироваться</Link>
          </>
        ) : (
          <>
            <Link onClick={(e) => {
              setNav(3);
            }} to="/profile">{user.login}</Link>
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
        <div ref={hoverEl} className="animation start-home" />
      </nav>
    </header>
  );
}
