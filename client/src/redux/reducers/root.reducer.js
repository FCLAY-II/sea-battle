import { combineReducers } from 'redux';
import gameReducer from './game.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
});

export default rootReducer;
