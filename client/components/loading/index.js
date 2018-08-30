import React from 'react';
import './index.scss';

export default class Loading extends React.Component {
	render(){
		let display = "block";
		if(!this.props.visible){
			display = "none";
		}
		return (
			<div className="loading">
				<div className="message">{this.props.message}</div>
				<i className="iconfont icon-loading" style={{display}}></i>
			</div>
		)
	}
}