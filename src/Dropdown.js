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
	return (
		<div
			onClick={this.showList}
			style={{top: '10px', left: '180px'}}
			className="dropdown">
			<span className="fa fa-male"></span>
			{this.state.showList ? <div className="list">list</div> : null}
	  	</div>
	);
	}
}
