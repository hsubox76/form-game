import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './stylesheets/stylesheet.scss';
import 'font-awesome/css/font-awesome.css';
import BoxOne from './BoxOne';
import * as Actions from './actions';
import { COMMANDS } from './constants';

function mapStateToProps(state) {
	return {
		charPosition: state.charPosition,
		keys: state.keys
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
	}
	componentDidMount() {
    	document.addEventListener('keydown', this.handleKeyUpDown, false);
    	document.addEventListener('keyup', this.handleKeyUpDown, false);
	}
	componentWillUnmount() {
    	document.removeEventListener('keydown', this.handleKeyUpDown, false);
    	document.removeEventListener('keyup', this.handleKeyUpDown, false);
	}
	render() {
		const props = this.props;
		return (
			<div>
		      <BoxOne />
		  	</div>
		);
	}
}

App.propTypes = {
	charPosition: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(App);