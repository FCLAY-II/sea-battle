import { EXIT_USER, LOG_USER, REG_USER } from '../types/user.types';

function userReducer(stateUser = null, action) {
  switch (action.type) {
    case REG_USER:
    case LOG_USER:
      return action.payload;
    case EXIT_USER:
      return null;
    default:
      return stateUser;
  }

}

export default userReducer;
