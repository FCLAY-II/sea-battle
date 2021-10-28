import './App.css';
import Game from './components/Game/Game';
import GameContextProvider from './contexts/game.context';




function App() {
  return <div className="App">
    <GameContextProvider>
    <Game/>
    </GameContextProvider>
  </div>;
}

export default App;
