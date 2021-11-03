import { ADD_INVITE, EXIT_USER, REMOVE_INVITE, SET_USER, UPDATE_TOKENS } from '../types/user.types';

function throughLocalStorage(user) {
  window.localStorage.setItem('user', JSON.stringify(user));
  return user;
}

function userReducer(stateUser = {}, action) {
  switch (action.type) {
    case SET_USER:
      return throughLocalStorage({
        ...action.payload,
        invitesCount: 0,
      });
    case UPDATE_TOKENS:
      return throughLocalStorage({
        ...stateUser,
        ...action.payload,
      });
    case EXIT_USER:
      return {
        login: null
      };
    case ADD_INVITE:
      return throughLocalStorage({
        ...stateUser,
        invitesCount: stateUser.invitesCount + 1,
      });
    case REMOVE_INVITE:
      return throughLocalStorage({
        ...stateUser,
        invitesCount: stateUser.invitesCount - 1,
      });
    default:
      return stateUser;
  }
}

export default userReducer;
