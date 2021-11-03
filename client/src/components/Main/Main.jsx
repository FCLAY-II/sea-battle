import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegForm from '../RegForm/RegForm';
import LogForm from '../LogForm/LogForm';
import SocketProvider from '../../contexts/socket.context';
import NotAuthRoute from '../NotAuthRoute/NotAuthRoute';
import Profile from '../Profile/Profile';

import './styles.css';
import GamePage from '../GamePage/GamePage';

export default function Main() {

  const userLogin = useSelector((state) => state.user.login);
  console.log('Main rendered');
  
  return (
    <main>
      <Switch>
        <NotAuthRoute exact path="/register">
          <RegForm />
        </NotAuthRoute>
        <NotAuthRoute exact path="/login">
          <LogForm />
        </NotAuthRoute>
        {
          userLogin ? (
            <Route path="/">
              <SocketProvider>
                <Route exact path="/">
                  <p>Компонента с главной, к которой имеют доступ все пользователи</p>
                </Route>
                <Route exact path="/play">
                  <GamePage/>
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
              </SocketProvider>
            </Route>
            ) : (
              <></>
            )
        }
      </Switch>
    </main>
  );
}
