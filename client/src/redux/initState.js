const defaultState = {
  game: {
    myField: '0'.repeat(100),
    enemyField: '0'.repeat(100),
  },
  user: null,
  tokens: null,
  socket: null
}
 function initState (){
   const stateFromLS = JSON.parse(window.localStorage.getItem('redux'))
   const state = stateFromLS || defaultState
   return state
 }

 export default initState
