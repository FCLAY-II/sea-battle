import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import MainParaPage from './components/MainParaPage/MainParaPage';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <MainParaPage />
        <Switch>
          <Route exact path="/welcome">
            <p>НАДПИСЬ НА ГЛАВНОЙ</p>
          </Route>
          <Main />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
