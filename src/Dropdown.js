import React, { Component } from 'react';

export default class Dropdown extends Component {
	constructor() {
		super();
		this.state = {
			showList: false
		};
		this.showList = this.showList.bind(this);
	}
	showList() {
		this.setState({showList: !this.state.showList});
	}
	render() {
		const props = this.props;
		const style = {
			top: props.data.y + 'px',
			left: props.data.x + 'px',
			width: props.data.width + 'px',
			height: props.data.height + 'px'
		};
		return (
			<div
				onClick={this.showList}
				style={style}
				className="dropdown">
				{this.state.showList ? <div className="list">list</div> : null}
		  	</div>
		);
	}
}
