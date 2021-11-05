/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './regForm.css';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import userAC from '../../redux/actionCreators/userAC';

export default function RegForm() {

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="container">
      <div id="frmm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const userData = Object.fromEntries(new FormData(e.target));
            dispatch(userAC.signup(userData));
          }}
        >
          <div className="fom">
            <p>
              <b className='regb'> Добро пожаловать в Морской бой!!!</b>
              <Link to="/login" className="det navbar-brand">
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
                className="inp form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Логин
              </label>
              <input name="login" type="text" className="inp form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Пароль
              </label>
              <input
                name="password"
                type="password"
                className="inp form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="logi btn btn-primary">
              Потвердить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
