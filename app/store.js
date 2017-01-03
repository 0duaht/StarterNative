import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from 'reducers';

const enhancers = compose(applyMiddleware(thunkMiddleware));
export default createStore(reducers, {}, enhancers);