import { createContext, useContext } from "react";
import Cell from "../components/Cell/Cell";
import Row from "../components/Row/Row";

const GameContext = createContext()

function GameContextProvider({children}){

  function makeField() {
    let cells = []
    for (let i = 0; i <= 99; i++) {
      cells.push(<Cell key={i} id={i} />)
    }
    let arrField = []
    while (cells.length > 0) {
      let row = cells.splice(0, 10)
      arrField.push(<Row key={(cells.length+1) *230} cells={row}></Row> )
    }
    return arrField
  }

  return(
    <GameContext.Provider value={{ makeField }}>
    {children}
  </GameContext.Provider>
  )

}

export default GameContextProvider
export const useGameContext = ()=> useContext(GameContext)
