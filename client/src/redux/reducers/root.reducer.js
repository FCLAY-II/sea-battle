import gameReducer from "./game.reducer";
import { combineReducers } from "redux";
import userReducer from "./user.reduser";

const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer,
})

export default rootReducer
