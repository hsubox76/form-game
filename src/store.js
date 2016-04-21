import { createStore } from 'redux';
import { mainReducer } from './reducers';

const initialStore = {
	charPosition: {x: 0, y: 0},
	keys: {}
};

export default createStore(mainReducer, initialStore);