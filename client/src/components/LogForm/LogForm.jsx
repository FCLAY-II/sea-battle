/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Link } from 'react-router-dom'

export default function LogForm() {
  return (
    <>
      <form>
        <p>
          <b> С возвращением!</b>
          <Link to="/register" className="navbar-brand">
            <p>Зарегистрироваться</p>
          </Link>
        </p>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Пароль
          </label>
          <input
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
  )
}
