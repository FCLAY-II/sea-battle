/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userAC from '../../redux/actionCreators/userAC';
import './navBar.css';

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [nav, setNav] = useState({ width: '', left: '' });
  const [prevNav, setprevNav] = useState({ width: '', left: '' });

  return (
    <header className="opt">
      <nav
        onMouseEnter={(e) => setNav({ width: '', left: '' })}
        onMouseLeave={(e) => setNav((...prev) => prev)}
        className="header__nav"
      >
        <Link
          onClick={(e) => (
            setNav({ width: '27%', left: '-8px' }),
            setprevNav({ width: '27%', left: '-8px' })
          )}
          to="/"
        >
          Главная
        </Link>
        <Link
          onClick={(e) => (
            setNav({ width: '25%', left: '25%' }),
            setprevNav({ width: '25%', left: '25%' })
          )}
          to="/play"
        >
          Играть
        </Link>

        {!user.login ? (
          <>
            <Link onClick={(e) => {
              setNav(3);
            }} to="/login">Авторизоваться</Link>
            <Link onClick={() => setNav(4)} to="/register">Зарегистрироваться</Link>
          </>
        ) : (
          <>
            <Link
              onClick={(e) => (
                setNav({ width: '24%', left: '50%' }),
                setprevNav({ width: '24%', left: '50%' })
              )}
              to="/profile"
            >
              {user.login}
            </Link>
            <Link
              onClick={() => (
                setNav({ width: '27%', left: '74%' }),
                setprevNav({ width: '27%', left: '74%' }),
                dispatch(userAC.logout())
              )}
              to="/"
            >
              Выйти
            </Link>
          </>
        )}
        <div
          style={{
            width: nav.width === '' ? nav.width : prevNav.width,
            left: nav.left === '' ? nav.left : prevNav.left,
          }}
          className="animation start-home"
        />
      </nav>
    </header>
  );
}
