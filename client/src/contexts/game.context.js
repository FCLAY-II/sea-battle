import { createContext, useContext } from "react";
import Cell from "../components/Cell/Cell";
import Row from "../components/Row/Row";
import { useDispatch, useSelector } from "react-redux";
import { makeTurn } from "../redux/actionCreators/gameAC";
import ShipCell from "../components/ShipCell/ShipCell";

const GameContext = createContext()

function GameContextProvider({ children }) {

  const dispatch = useDispatch()
  const game = useSelector(state => state.game)


  function makeTurnReact(ind) {
    const enemyField = game.enemyField.split('')
    enemyField[ind] = '2';
    const newEnemyField = enemyField.join('')
    dispatch(makeTurn(newEnemyField))
  }

  function makeShip(size) {
    const ship = []
    for (let i = 1; i <= size; i++) {
      ship.push(<ShipCell />)
    }
    return ship
  }



  function makeField(state) {
    let cells = []
    for (let i = 0; i < state.length; i++) {
      cells.push(<Cell cellState={state[i]} key={i} id={i} />)
    }
    let arrField = []
    while (cells.length > 0) {
      let row = cells.splice(0, 10)
      arrField.push(<Row key={(cells.length + 1) * 230} cells={row}></Row>)
    }
    return arrField
  }

  return (
    <GameContext.Provider value={{ makeField, game, makeTurnReact, makeShip }}>
      {children}
    </GameContext.Provider>
  )

}

export default GameContextProvider
export const useGameContext = () => useContext(GameContext)
