import { createContext, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cell from '../components/Cell/Cell';
import Row from '../components/Row/Row';
import ShipCell from '../components/ShipCell/ShipCell';
import { useSocket } from './socket.context';

const GameContext = createContext();

function GameContextProvider({ children }) {

  const { fetchSender, descriptors } = useSocket();
  const game = useSelector(state => state.game);

  useEffect(() => {
    fetchSender(descriptors.loadGame(1));
  }, []);

  function makeTurn(cellId) {
    fetchSender(descriptors.makeTurn(cellId));
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
    <GameContext.Provider value={{ makeField, game, makeTurn, makeShip }}>
      {children}
    </GameContext.Provider>
  );

}

export default GameContextProvider;
export const useGameContext = () => useContext(GameContext);