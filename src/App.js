import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './stylesheets/stylesheet.scss';
import 'font-awesome/css/font-awesome.css';
import BoxOne from './BoxOne';
import * as Actions from './actions';
import { COMMANDS, CHAR_HEIGHT } from './constants';

function mapStateToProps(state) {
	return {
		charPosition: state.charPosition,
		keys: state.keys,
		animation: state.animation,
		boxes: state.boxes,
		walls: state.walls
	};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

const KEY_COMMAND = {
	38: COMMANDS.UP,
	87: COMMANDS.UP,
	40: COMMANDS.DOWN,
	83: COMMANDS.DOWN,
	37: COMMANDS.LEFT,
	65: COMMANDS.LEFT,
	39: COMMANDS.RIGHT,
	68: COMMANDS.RIGHT,
	32: COMMANDS.JUMP
}

class App extends Component {
	constructor() {
		super();
		this.handleKeyUpDown = this.handleKeyUpDown.bind(this);
		this.jump = this.jump.bind(this);
		this.fall = this.fall.bind(this);
		this.count = 0;
		this.startTime = 0;
		this.endTime = 0;
	}
	handleKeyUpDown(e) {
		const props = this.props;
		const actions = props.actions;
		if (_.has(KEY_COMMAND, e.keyCode)) {
			if (e.type === 'keydown') {
				actions.addCommand(KEY_COMMAND[e.keyCode]);
			} else {
				actions.removeCommand(KEY_COMMAND[e.keyCode]);
			}
		}
		actions.moveChar(props.keys);
		this.fall();
	}
	jump() {
		const props = this.props;
		if (props.animation.frame < props.animation.maxFrame) {
			props.actions.continueJump(props.animation, props.keys);
			requestAnimationFrame(this.jump);
		}
	}
	fall() {
		const props = this.props;
		const thisBox = _.find(props.boxes, {boxId: props.charPosition.boxId});
		if (this.count < 500 && props.charPosition.y + CHAR_HEIGHT + 1 < thisBox.height) {
			props.actions.continueFall();
			this.count++;
			requestAnimationFrame(this.fall);
		}
	}
	componentDidMount() {
    	document.addEventListener('keydown', this.handleKeyUpDown, false);
    	document.addEventListener('keyup', this.handleKeyUpDown, false);
	}
	componentWillUnmount() {
    	document.removeEventListener('keydown', this.handleKeyUpDown, false);
    	document.removeEventListener('keyup', this.handleKeyUpDown, false);
	}
	componentDidUpdate() {
		if (this.props.keys[COMMANDS.JUMP]) {
			this.props.actions.triggerJump();
			requestAnimationFrame(this.jump);
		}
	}
	render() {
		const props = this.props;
		return (
			<div>
		      <BoxOne data={props.boxes[1]} />
		  	</div>
		);
	}
}

App.propTypes = {
	charPosition: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(App);