import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link to="/" className=" mybtn">
            Главная страница
          </Link>
          <Link to="/play" className="mybtn">
            Начать игру
          </Link>
          <div>
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
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Выйти
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
