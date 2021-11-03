// const defaultState = {
//   game: {
//     status: null,
//     id: null,
//     field: '0'.repeat(100),
//     ships: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
//     enemy: {
//       id: null,
//       login: null,
//       field: '0'.repeat(100),
//     },
//   },
//   user: {
//     login: null,
//     invitesCount: 0,
//   },
// };

const defaultState = {
  game: null,
  user: {
    login: null,
  },
};
 function initState () {
   let state = defaultState;
   const stateFromLS = JSON.parse(window.localStorage.getItem('redux'));
   state = stateFromLS || defaultState;
   return state;
 }

export default initState;
