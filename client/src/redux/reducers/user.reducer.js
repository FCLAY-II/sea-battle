import { EXIT_USER, SET_USER, UPDATE_TOKENS } from '../types/user.types';

function userReducer(stateUser = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case UPDATE_TOKENS:
      return {
        ...stateUser,
        ...action.payload,
      };
    case EXIT_USER:
      return {
        login: null,
      };
    default:
      return stateUser;
  }
}

export default userReducer;
