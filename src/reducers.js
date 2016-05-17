import _ from 'lodash';
import { ACTIONS } from './actions';
import * as CONSTANTS from './constants';

const COMMANDS = CONSTANTS.COMMANDS;
const STEP_SIZE = CONSTANTS.STEP_SIZE;
const CHAR_WIDTH = CONSTANTS.CHAR_WIDTH;
const CHAR_HEIGHT = CONSTANTS.CHAR_HEIGHT;
const GRAVITY_STEP_SIZE = CONSTANTS.GRAVITY_STEP_SIZE;

function charInRange(char, wall) {
	return ((char[0] <= wall[0] && wall[0] <= char[1])
			|| (char[0] >= wall[0] && char[1] <= wall[1])
			|| (char[0] <= wall[1] && char[1] >= wall[1]));
}

function getWillCollide(wallsList, newPos) {
	const collisions = { x: null, y: null };
	const charBounds = {
		top: newPos.y,
		bottom: newPos.y + CHAR_HEIGHT,
		left: newPos.x,
		right: newPos.x + CHAR_WIDTH
	};
	_.forEach(wallsList, (wall) => {
			// console.log(wall);
			// console.log('a', charBounds.left <= wall.x);
			// console.log('b', charBounds.right >= wall.x);
			if (_.has(wall, 'x')
				&& charBounds.left <= wall.x
				&& charBounds.right >= wall.x) {
				if (charInRange([charBounds.top, charBounds.bottom], [wall.y0, wall.y1])) {
					collisions.x = true;
				}
			}
			// console.log('c', charBounds.top <= wall.y);
			// console.log('d', charBounds.bottom >= wall.y);
			if (_.has(wall, 'y')
				&& charBounds.top <= wall.y
				&& charBounds.bottom >= wall.y) {
				if (charInRange([charBounds.left, charBounds.right], [wall.x0, wall.x1])) {
					collisions.y = true;
				}
			}
		});
	console.log('collisions ', collisions);
	return collisions;
}

function charPosition (state = {}, action, wallsList) {
	let newPos;
	switch(action.type) {
		case ACTIONS.CONTINUE_FALL:
			let fallVelocity = CONSTANTS.GRAVITY_STEP_SIZE;
			let newY = state.y + fallVelocity;
			const nearestWallBelow = _(wallsList)
				.filter((wall) => {
					return _.has(wall, 'y')
							&& wall.y > state.y + CHAR_HEIGHT
							&& charInRange([state.x, state.x + CHAR_WIDTH], [wall.x0, wall.x1]);
				})
				.reduce((accumulator, wall) => {
					return wall.y < accumulator ? wall.y : accumulator;
				}, Infinity);
			if (newY + CHAR_HEIGHT >= nearestWallBelow) {
				newY = nearestWallBelow - 1 - CHAR_HEIGHT;
			}
			return _.extend({}, state, {y: newY});
		case ACTIONS.CONTINUE_JUMP:
			newPos = {x: state.x, y: state.y};
			const anim = action.animation;
			let jumpDirection = null;
			if (action.keys[COMMANDS.LEFT]) {
				newPos.x = state.x - 1;
			} else if (action.keys[COMMANDS.RIGHT]) {
				newPos.x = state.x + 1;
			}
			let jumpVelocity = CONSTANTS.JUMP_STEP_SIZE
				* (Math.abs(anim.maxFrame / 2 - anim.frame) / anim.maxFrame);
			const isFirstHalf = anim.frame < anim.maxFrame / 2;
			if (isFirstHalf) {
				newPos.y = state.y - jumpVelocity;
			} else {
				newPos.y = state.y + jumpVelocity;
				if (newPos.y > anim.startY) {
					newPos.y = anim.startY;
				}
			}
			const collision = getWillCollide(wallsList, newPos)
			if (collision.x) {
				if (isFirstHalf) {
					newPos.x -= collision.x.bottom;
				} else {
					newPos.x = state.x;
				}
			}
			if (getWillCollide(wallsList, newPos).y) {
				newPos.y = state.y;
			}
			return _.extend({}, state, newPos);
		case ACTIONS.MOVE_CHAR:
			if (!action.commands[COMMANDS.JUMP]) {
				const dirCommands = _(action.commands)
				.map((val, command) => {
					return val ? command : null;
				})
				.filter((command) => {
					return command && command !== COMMANDS.JUMP;
				})
				.value();
				newPos = {x: state.x, y: state.y};
				console.log(newPos);
				switch (dirCommands[0]) {
					// case COMMANDS.UP:
					// 	newPos.y = state.y - STEP_SIZE;
					// 	break;
					// case COMMANDS.DOWN:
					// 	newPos.y = state.y + STEP_SIZE;
					// 	break;
					case COMMANDS.RIGHT:
						newPos.x = state.x + STEP_SIZE;
						break;
					case COMMANDS.LEFT:
						newPos.x = state.x - STEP_SIZE;
						break;
					default:
						return state;
				}
				let willCollide = getWillCollide(wallsList, newPos);
				return willCollide.x || willCollide.y ? state : _.extend({}, state, newPos);
			}
		default:
			return state;
	}
};

function keys (state = {}, action) {
	let newCommand = {};
	switch(action.type) {
		case ACTIONS.ADD_COMMAND:
			newCommand[action.command] = true;
			return _.extend({}, state, newCommand);
		case ACTIONS.REMOVE_COMMAND:
			newCommand[action.command] = false;
			return _.extend({}, state, newCommand);
		case ACTIONS.TRIGGER_JUMP:
			newCommand[COMMANDS.JUMP] = false;
			return _.extend({}, state, newCommand);
		default:
			return state;
	}
}

function animation (state = {}, action, charPosition) {
	switch(action.type) {
		case ACTIONS.TRIGGER_JUMP:
			return _.extend({}, state, {frame: 1, maxFrame: 16, startY: charPosition.y});
		case ACTIONS.CONTINUE_JUMP:
			return _.extend({}, state, {frame: state.frame + 1});
		default:
			return state;
	}
}

function box (state = {}, action) {
	switch(action.type) {
		// case ACTIONS.UPDATE_WALLS:
		// 	return _.extend({}, state, {
		// 		walls: [0, action.data.width / STEP_SIZE]
		// 	});
		default:
			return state;
	}
}

function boxes (state = [], action) {
	switch(action.type) {
		// case ACTIONS.UPDATE_WALLS:
		// 	const boxId = action.data.boxId;
		// 	return [
		// 		...state.slice(0, boxId),
		// 		box(state[boxId], action),
		// 		...state.slice(boxId + 1)
		// 	];
		default:
			return state;
	}
}

function walls (state = [], action, elements) {
	switch(action.type) {
		case ACTIONS.UPDATE_WALLS:
			const boxId = action.data.boxId;
			const boxWalls = [
				{x: 0, y0: 0, y1: action.data.height},
				{x: action.data.width, y0: 0, y1: action.data.height},
				{y: 0, x0: 0, x1: action.data.width},
				{y: action.data.height, x0: 0, x1: action.data.width}
			];
			const boxElements = _.filter(elements, {boxId: boxId});
			const elementWalls = _.reduce(boxElements, (wallsList, element) => {
				return wallsList.concat([
					{x: element.x, y0: element.y, y1: element.y + element.height},
					{x: element.x + element.width, y0: element.y, y1: element.y + element.height},
					{y: element.y, x0: element.x, x1: element.x + element.width},
					{y: element.y + element.height, x0: element.x, x1: element.x + element.width},
				]);
			}, []);
			return boxWalls.concat(elementWalls);
		default:
			return state;
	}
}

function elements (state = [], action) {
	switch(action.type) {
		default:
			return state;
	}
}

export function mainReducer (state, action) {
	return {
		charPosition: charPosition(state.charPosition, action, state.walls),
		keys: keys(state.keys, action),
		animation: animation(state.animation, action, state.charPosition),
		boxes: boxes(state.boxes, action),
		walls: walls(state.walls, action, state.elements),
		elements: elements(state.elements, action)
	};
}