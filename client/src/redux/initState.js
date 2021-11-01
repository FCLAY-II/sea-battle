const defaultState = {
  game: {
    id: null,
    field: '0'.repeat(100),
    enemy: {
      id: null,
      login: null,
      field: '0'.repeat(100),
    },
  },
  user: {
    login: null,
  },
};
function initState() {
  const state = defaultState;
  const userFromLS = JSON.parse(window.localStorage.getItem('user'));
  state.user = userFromLS || defaultState.user;
  return state;
}

export default initState;
