import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from '../Game/Game';
import RegForm from '../RegForm/RegForm';
import LogForm from '../LogForm/LogForm';
import GameContextProvider from '../../contexts/game.context';
import SocketProvider from '../../contexts/socket.context';
import NotAuthRoute from '../NotAuthRoute/NotAuthRoute';
import Profile from '../Profile/Profile';
import { useAuth } from '../../contexts/auth.context';

import './styles.css';

export default function Main() {

  const { isAuth } = useAuth();
  console.log('Main rendered');
  
  return (
    <main>
      <Switch>
        <Route path="/logout">
          <p>LOGOUT</p>
        </Route>
        <NotAuthRoute exact path="/register">
          <RegForm />
        </NotAuthRoute>
        <NotAuthRoute exact path="/login">
          <LogForm />
        </NotAuthRoute>
        {
          isAuth ? (
            <Route path="/">
              <SocketProvider>
                <Route exact path="/">
                  <p>Компонента с главной, к которой имеют доступ все пользователи</p>
                </Route>
                <Route exact path="/play">
                  <GameContextProvider>
                    <Game />
                  </GameContextProvider>
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
