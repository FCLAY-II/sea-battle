import { EXIT_USER, SET_USER, UPDATE_TOKENS } from '../types/user.types';

const userAC = {
  setUser: (user) => ({
    type: SET_USER,
    payload: user
  }),

  signup(user) {
    return async (dispatch) => {
      console.log(user);
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
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
        const error = await response.json();
        alert(error.message);
      }
    };
  },

  logoutDelivery: () => ({
    type: EXIT_USER
  }),

  logout() {
    return async (dispatch) => {
      const response = await fetch('http://localhost:3001/auth/logout', {
        method: 'GET', 
      });
      if (response.ok) {
        dispatch(this.logoutDelivery());
      }
    };
  },

  updateTokens: ({ accessToken, refreshToken }) => ({
    type: UPDATE_TOKENS,
    payload: { accessToken, refreshToken }
  })
};

export default userAC;
