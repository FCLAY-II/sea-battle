import { ADD_RECEIVED_INVITE, ADD_SENT_INVITE, EXIT_USER, REMOVE_RECEIVED_INVITE, REMOVE_SENT_INVITE, SET_USER, UPDATE_TOKENS } from '../types/user.types';

function throughLocalStorage(user) {
  window.localStorage.setItem('user', JSON.stringify(user));
  return user;
}

function userReducer(stateUser = {}, action) {
  switch (action.type) {
    case SET_USER:
      return throughLocalStorage({
        ...action.payload,
        receivedInvitesCount: 0,
        sentInvitesCount: 0
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
    case ADD_RECEIVED_INVITE:
      return throughLocalStorage({
        ...stateUser,
        receivedInvitesCount: stateUser.receivedInvitesCount + 1,
      });
    case REMOVE_RECEIVED_INVITE:
      return throughLocalStorage({
        ...stateUser,
        receivedInvitesCount: stateUser.receivedInvitesCount - 1,
      });
    case ADD_SENT_INVITE:
      return throughLocalStorage({
        ...stateUser,
        sentInvitesCount: stateUser.sentInvitesCount + 1,
      });
    case REMOVE_SENT_INVITE:
      return throughLocalStorage({
        ...stateUser,
        sentInvitesCount: stateUser.sentInvitesCount - 1,
      });
    default:
      return stateUser;
  }
}

export default userReducer;
