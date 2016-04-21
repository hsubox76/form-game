export const ACTIONS = {
	MOVE_CHAR: 'MOVE_CHAR',
	UPDATE_WALLS: 'UPDATE_WALLS',
	ADD_COMMAND: 'ADD_COMMAND',
	REMOVE_COMMAND: 'REMOVE_COMMAND'
};

export function moveChar(keys) {
	return {type: ACTIONS.MOVE_CHAR, keys};
}

export function updateWalls() {
	return {type: ACTIONS.UPDATE_WALLS};
}

export function addCommand(command) {
	return {type: ACTIONS.ADD_COMMAND, command};
}

export function removeCommand(command) {
	return {type: ACTIONS.REMOVE_COMMAND, command};
}