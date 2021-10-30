import { combineReducers } from 'redux';
import gameReducer from './game.reducer';
import socketReducer from './socket.reducer';
import userReducer from './user.reduser';

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
  socket: socketReducer
});

export default rootReducer;
