import { createStore } from 'redux';
import { mainReducer } from './reducers';

const initialStore = {
	charPosition: {x: 5, y: 5, boxId: 1},
	keys: {},
	animation: {frame: 0},
	boxes: [
	{},
	{
		boxId: 1,
		width: 250,
		height: 50
	}
	],
	elements: [
	{
		boxId: 1,
		elementId: 0,
		width: 120,
		height: 20,
		x: 100,
		y: 10
	}
	]
};

export default createStore(mainReducer, initialStore);