import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';
import './navBar.css';

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const { isAuth } = useAuth();

  return (
    <header className="opt">
      <nav>
        <Link to="/">Главная страница</Link>
        <Link to="/play">Играть</Link>

        {!isAuth ? (
          <>
            <Link to="/login">Авторизоваться</Link>
            <Link to="/register">Зарегистрироваться</Link>
          </>
        ) : (
          <>
            <Link to="/profile">{user.login}</Link>
            <Link to="/logout">Выйти</Link>
          </>
        )}
        <div className="animation start-home" />
      </nav>
    </header>
  );
}
