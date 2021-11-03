import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import initState from './initState';
import rootReducer from './reducers/root.reducer';

const store = createStore(
  rootReducer, 
  initState(), 
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  console.log('rewrite');
  window.localStorage.setItem('redux', JSON.stringify(store.getState()));
});

export default store;
