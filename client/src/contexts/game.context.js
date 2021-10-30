import { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cell from '../components/Cell/Cell';
import Row from '../components/Row/Row';
import gameAC from '../redux/actionCreators/gameAC';
import ShipCell from '../components/ShipCell/ShipCell';

const GameContext = createContext();

function GameContextProvider({ children }) {

  const dispatch = useDispatch();
  const game = useSelector(state => state.game);

  function makeTurnReact(ind) {
    const enemyField = game.enemyField.split('');
    enemyField[ind] = '2';
    const newEnemyField = enemyField.join('');
    dispatch(gameAC.makeTurn(newEnemyField));
  }

  function makeShip(size) {
    const ship = [];
    for (let i = 1; i <= size; i += 1) {
      ship.push(<ShipCell />);
    }
    return ship;
  }



  function makeField(state) {
    const cells = [];
    for (let i = 0; i < state.length; i += 1) {
      cells.push(<Cell cellState={state[i]} key={i} id={i} />);
    }
    const arrField = [];
    while (cells.length > 0) {
      const row = cells.splice(0, 10);
      arrField.push(<Row key={cells.length + 230} cells={row} />);
    }
    return arrField;
  }

  return (
    <GameContext.Provider value={{ makeField, game, makeTurnReact, makeShip }}>
      {children}
    </GameContext.Provider>
  );

}

export default GameContextProvider;
export const useGameContext = () => useContext(GameContext);
