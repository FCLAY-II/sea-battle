/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import userAC from '../../redux/actionCreators/userAC';
import './logForm.css';

export default function LogForm() {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div id="frm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            console.log(data);
            dispatch(userAC.signin(data));
          }}
        >
          <div className="fom">
          <p>
            <b> С возвращением!</b>
            <Link to="/register" className="det navbar-brand">
              <p>Зарегистрироваться</p>
            </Link>
          </p>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              name="login"
              type="email"
              className="inp form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
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
