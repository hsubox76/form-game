export const ACTIONS = {
	MOVE_CHAR: 'MOVE_CHAR',
	UPDATE_WALLS: 'UPDATE_WALLS',
	ADD_COMMAND: 'ADD_COMMAND',
	REMOVE_COMMAND: 'REMOVE_COMMAND',
	TRIGGER_JUMP: 'TRIGGER_JUMP',
	CONTINUE_JUMP: 'CONTINUE_JUMP',
};

export function moveChar(commands) {
	return {type: ACTIONS.MOVE_CHAR, commands};
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

export function triggerJump() {
	return {type: ACTIONS.TRIGGER_JUMP};
}

export function continueJump(animation, keys) {
	return {type: ACTIONS.CONTINUE_JUMP, animation, keys};
}

export function updateWalls(data) {
	return {type: ACTIONS.UPDATE_WALLS, data}
}