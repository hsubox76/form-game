import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from './Dropdown';
import * as Actions from './actions';

function mapStateToProps(state) {
	return {
		charPosition: state.charPosition,
		elements: state.elements
	};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

class BoxOne extends Component {
	constructor(props) {
		super(props);
		props.actions.updateWalls(props.data);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.data.boxId === nextProps.charPosition.boxId
			&& nextProps.charPosition.boxId !== this.props.charPosition.boxId) { // char in box
			this.props.actions.updateWalls(nextProps.data);
		}
	}
	render() {
		const props = this.props;
		const style = {
			width: props.data.width + 'px',
			height: props.data.height + 'px'
		}
		return (
	      <div className="box" style={style}>
			<span
				style={{
					top: props.charPosition.y + 'px',
					left: props.charPosition.x + 'px'
				}}
				className="char fa fa-male"></span>
	      	<Dropdown data={props.elements[0]} />
	      </div>
		);
	}
}

BoxOne.propTypes = {
	charPosition: React.PropTypes.object,
	data: React.PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxOne);