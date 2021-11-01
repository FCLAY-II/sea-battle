/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import userAC from '../../redux/actionCreators/userAC';

export default function RegForm() {

  const dispatch = useDispatch();

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        const userData = Object.fromEntries(new FormData(e.target));
        dispatch(userAC.signup(userData));
      }}>
        <p>
          <b> Добро пожаловать в Морской бой!!!</b>
          <Link to="/login" className="navbar-brand">
            <p>Уже есть аккаунт?</p>
          </Link>
        </p>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Логин
          </label>
          <input
            name="login"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Пароль
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Потвердить
        </button>
      </form>
    </>
  );
}
