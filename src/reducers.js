import _ from 'lodash';
import { ACTIONS } from './actions';
import * as CONSTANTS from './constants';

const COMMANDS = CONSTANTS.COMMANDS;
const STEP_SIZE = CONSTANTS.STEP_SIZE;

function charPosition (state, action) {
	switch(action.type) {
		case ACTIONS.MOVE_CHAR:
			if (_.includes(action.keys, COMMANDS.LEFT)) {
				return _.extend({}, state, {x: state.x - STEP_SIZE})
			}
			if (_.includes(action.keys, COMMANDS.RIGHT)) {
				return _.extend({}, state, {x: state.x + STEP_SIZE})
			}
		default:
			return state;
	}
};

function keys (state, action) {
	let newCommand = {};
	switch(action.type) {
		case ACTIONS.ADD_COMMAND:
			newCommand[action.command] = true;
			return _.extend({}, state, newCommand);
		case ACTIONS.REMOVE_COMMAND:
			newCommand[action.command] = false;
			return _.extend({}, state, newCommand);
		default:
			return state
	}
}

export function mainReducer (state, action) {
	return {
		charPosition: charPosition(state.charPosition, action),
		keys: keys(state.keys, action)
	};
}