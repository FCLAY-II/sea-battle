import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Game from './components/Game/Game'
import Navbar from './components/Navbar/Navbar'
import RegForm from './components/RegForm/RegForm'
import LogForm from './components/LogForm/LogForm'
import GameContextProvider from './contexts/game.context'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="App">
          <GameContextProvider>
            <Switch>
              <Route exact path="/">
                <Game />
              </Route>
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
    </>
  )
}

export default App
