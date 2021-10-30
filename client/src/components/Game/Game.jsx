import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import gameAC from '../../redux/actionCreators/gameAC';
import EnemyField from '../EnemyField/EnemyField';
import MyField from '../MyField/MyField';
// import Ships from '../Ships/Ships';




export default function Game() {

  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gameAC.loadGame());
  }, [dispatch]);

  return (
    <div className="game">
      
      <MyField/>
      <EnemyField/>
      
    </div>
  );
}

