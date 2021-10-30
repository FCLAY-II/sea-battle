import { EXIT_USER, LOG_USER, REG_USER } from '../types/user.types';

const userAC = {
  signupDelivery: (user) => ({
    type: REG_USER,
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
        dispatch(this.signupDelivery(activeUser));
      }
    };
  },

  signinDelivery: (user) => ({
    type: LOG_USER,
    payload: user
  }),

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
        dispatch(this.signinDelivery(activeUser));
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
  }
};

export default userAC;
