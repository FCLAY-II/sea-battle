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
        <section className="banner">
        <div className="container">
          <div id="scene">
            <div className="layer"><img src="/img/parallax/sun.png" alt="sun"/></div>
            <div className="layer">
              <img src="img/parallax/mountains.png" alt="mountains"/>
            </div>
            <div className="layer" data-depth="-0.5" >
              <img src="img/parallax/birds.png" className="birds" alt="birds"/>
            </div>
            <div className="layer" data-depth-y="0.15">
              <img src="img/parallax/clouds_left.png" className="clouds-left" alt="clouds_left"/>
              <img src="img/parallax/clouds_right.png" className="clouds-right" alt="clouds_right"/>
            </div>
            <div className="layer" data-depth-x="0.5">
              <img src="img/parallax/grass_01.png" alt="grass_01"/>
            </div>
            <div className="layer">
              <img src="img/parallax/grass_02.png" alt="grass_02"/>
              <img src="img/parallax/sands.png" alt="sands"/>
            </div>
            <div className="layer" data-depth="0.2">
              <img src="img/parallax/wave_01.png" className="wave_1" alt="wave_01"/>
              <img src="img/parallax/boat_01.png" className="boat_1" alt="boat_01"/>
            </div>
            <div className="layer" data-depth="0.4">
              <img src="img/parallax/wave_02.png" className="wave_2" alt="wave_02"/>
              <img src="img/parallax/boat_02.png" className="boat_2" alt="boat_02"/>
            </div>
            <div className="layer" data-depth="0.15">
              <img src="img/parallax/wave_03.png" className="wave_3" alt="wave_03"/>
              <img src="img/parallax/wave_04.png" className="wave_4" alt="wave_04"/>
            </div>
            <div className="layer" data-depth-x="0.5">
              <img src="img/parallax/boat_03.png" className="boat_5" alt="boat_03"/>
              <img src="img/parallax/wave_05.png" className="wave_5" alt="wave_5"/>
            </div>
          </div>
        </div>
      </section>
        <Switch>
          <Route exact path="/welcome">
            <p />
          </Route>
          <Main />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
