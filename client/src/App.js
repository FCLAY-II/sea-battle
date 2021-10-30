import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Game from './components/Game/Game';
import Navbar from './components/Navbar/Navbar';
import RegForm from './components/RegForm/RegForm';
import LogForm from './components/LogForm/LogForm';
import GameContextProvider from './contexts/game.context';
import AuthProvider from './contexts/auth.context';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
          <Navbar />
          <div className="App">
            <GameContextProvider>
              <Switch>
                <PrivateRoute exact path="/">
                  <Game />
                </PrivateRoute>
                <Route exact path="/register">
                  <RegForm />
                </Route>
                <Route exact path="/login">
                  <LogForm />
                </Route>
              </Switch>
            </GameContextProvider>
          </div>
        </Router>
    </AuthProvider>
  );
}

export default App;
