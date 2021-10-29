import './App.css';
import Game from './components/Game/Game';
import GameContextProvider from './contexts/game.context';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <div className="App">
      <Router>
        <Navbar />
        <GameContextProvider>
          <Switch>
            <Route exact path="/">
              <Game />
            </Route>
          </Switch>
        </GameContextProvider>
      </Router>
    </div>
    </>
  );
}

export default App;
