import React from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userAC from '../../redux/actionCreators/userAC';
import './navBar.css';

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <nav>
      <Link to="/">Главная страница</Link>
      <Link to="/play">Играть</Link>

      {!user.login ? (
        <>
          <Link to="/login">Авторизоваться</Link>
          <Link to="/register">Зарегистрироваться</Link>
        </>
      ) : (console.log('kindaauth'), (
        <>
          <Link to="/profile">{user.login}</Link>
          <span onClick={() => {
            dispatch(userAC.logout());
          }}><Link to="/">Выйти</Link></span>
        </>
      ))}
      <div className="animation start-home" />
    </nav>
  );
}
