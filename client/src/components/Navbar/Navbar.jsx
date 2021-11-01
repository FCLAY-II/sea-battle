import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const { isAuth } = useAuth();

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Главная страница
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/play" className="nav-link">
                Начать игру
              </Link>
            </li>
          </ul>
          <div>
            {!isAuth ? (
              <div>
                {' '}
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                  <li className="nav-item active">
                    <Link to="/login" className="nav-link">
                      Авторизоваться
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link to="/register" className="nav-link">
                      Зарегистрироваться
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                  <Link to="/profile" className="nav-link">
                    {user.login}
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/" className="nav-link">
                    Выйти
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
