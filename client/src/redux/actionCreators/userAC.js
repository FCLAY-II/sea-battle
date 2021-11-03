import { ADD_INVITE, EXIT_USER, REMOVE_INVITE, SET_USER, UPDATE_TOKENS } from '../types/user.types';
import gameAC from './gameAC';

const userAC = {
  setUser: (user) => ({
    type: SET_USER,
    payload: user,
  }),

  signup(user) {
    return async (dispatch) => {
      console.log(user);
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const activeUser = await response.json();
        dispatch(this.setUser(activeUser));
      }
    };
  },

  signin(user) {
    return async (dispatch) => {
      console.log(user);
      const response = await fetch('http://localhost:3001/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const activeUser = await response.json();
        dispatch(this.setUser(activeUser));
      } else {
        // const error = await response.json();
      }
    };
  },

  logoutDelivery: () => ({
    type: EXIT_USER,
  }),

  logout() {
    return async (dispatch, getState) => {
      const { user } = getState();
      const response = await fetch(`http://localhost:3001/api/auth/logout/${user.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(this.logoutDelivery());
        dispatch(gameAC.setGame(null));
        window.localStorage.clear();
      } else {
        alert('не удалось выйти из системы');
      }
    };
  },

  resetTokens: ({ accessToken, refreshToken }) => ({
    type: UPDATE_TOKENS,
    payload: { accessToken, refreshToken },
  }),
  addInvite: ()=>({
    type: ADD_INVITE,
  }),
  removeInvite: ()=>({
    type: REMOVE_INVITE,
  }),

};

export default userAC;
