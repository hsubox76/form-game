import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from './Dropdown';
import * as Actions from './actions';

function mapStateToProps(state) {
	return {
		charPosition: state.charPosition
	};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

class App extends Component {
	constructor() {
		super();
	}
	componentWillMount() {
		this.props.actions.updateWalls();
	}
	render() {
		const props = this.props;
		return (
	      <div className="box">
			<span
				style={{
					top: props.charPosition.y + 'px',
					left: props.charPosition.x + 'px'
				}}
				className="char fa fa-male"></span>
	      	<Dropdown />
	      </div>
		);
	}
}

App.propTypes = {
	charPosition: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(App);