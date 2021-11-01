import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import React from 'react';
import Game from './components/Game/Game';
import Navbar from './components/Navbar/Navbar';
import RegForm from './components/RegForm/RegForm';
import LogForm from './components/LogForm/LogForm';
import GameContextProvider from './contexts/game.context';
import AuthProvider from './contexts/auth.context';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SocketProvider from './contexts/socket.context';
import NotAuthRoute from './components/NotAuthRoute/NotAuthRoute';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/play">
              <SocketProvider>
                <GameContextProvider>
                  <Game />
                </GameContextProvider>
              </SocketProvider>
            </PrivateRoute>
            <PrivateRoute exact path="/profile">
              <SocketProvider>
                <GameContextProvider>
                  <Profile />
                </GameContextProvider>
              </SocketProvider>
            </PrivateRoute>
            <NotAuthRoute exact path="/register">
              <RegForm />
            </NotAuthRoute>
            <NotAuthRoute exact path="/login">
              <LogForm />
            </NotAuthRoute>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
