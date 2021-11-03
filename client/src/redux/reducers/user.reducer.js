import { ADD_INVITE, EXIT_USER, REMOVE_INVITE, SET_USER, UPDATE_TOKENS } from '../types/user.types';

function userReducer(stateUser = {}, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.payload,
        invitesCount: 0,
      };
    case UPDATE_TOKENS:
      return {
        ...stateUser,
        ...action.payload,
      };
    case EXIT_USER:
      return {
        login: null,
      };
    case ADD_INVITE:
      return {
        ...stateUser,
        invitesCount: stateUser.invitesCount + 1,
      };
    case REMOVE_INVITE:
      return {
        ...stateUser,
        invitesCount: stateUser.invitesCount - 1,
      };
    default:
      return stateUser;
  }
}

export default userReducer;
