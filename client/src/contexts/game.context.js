import { createContext, useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Cell from '../components/Cell/Cell';
import Row from '../components/Row/Row';
import ShipCell from '../components/ShipCell/ShipCell';
import gameAC from '../redux/actionCreators/gameAC';
import { useSocket } from './socket.context';

const GameContext = createContext();

function GameContextProvider({ children }) {
  const dispatch = useDispatch();

  const { fetchSender, descriptors } = useSocket();

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


  const putShip = useCallback((field, id) => {
    const myField = field.split('');
    if (myField[id] === '0') {
      myField[id] = '1';
      dispatch(gameAC.putShip(myField.join('')));
    } else {
      myField[id] = '0';
      dispatch(gameAC.putShip(myField.join('')));
    }
  }, []);



  function makeField(state) {
    const cells = [];
    for (let i = 0; i < state.length; i += 1) {
      cells.push(<Cell cellState={state[i]} key={i} id={i} />);
    }
    const arrField = [(
      <Row num="" key={150} cells={
        ['A', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К']
          .map((letter) => <span className='field-label'>{letter}</span>)
      } />
    )];
    while (cells.length > 0) {
      const row = cells.splice(0, 10);
      arrField.push(<Row num={10 - Math.floor(cells.length / 10)} key={cells.length + 230} cells={row} />);
    }
    return arrField;
  }



  return (
    <GameContext.Provider value={{ makeField, makeTurn, makeShip, putShip }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
export const useGameContext = () => useContext(GameContext);
