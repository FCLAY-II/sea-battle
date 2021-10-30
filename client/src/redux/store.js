import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import initState from './initState';
import rootReducer from './reducers/root.reducer';

const store = createStore(rootReducer, initState(), applyMiddleware(thunk));

store.subscribe(()=>{
  window.localStorage.setItem('redux', JSON.stringify(store.getState()));
});

export default store;
