import { createStore } from 'redux';
import initState from './initState';
import rootReducer from './reducers/root.reducer';

const store = createStore(rootReducer, initState());

store.subscribe(()=>{
  window.localStorage.setItem('redux', JSON.stringify(store.getState()));
});

export default store;
