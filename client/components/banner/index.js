import React from 'react';
import './index.scss';

export default class Banner extends React.Component {
	render() {
		return (
			<div className="banner">
				<img src={this.props.url} alt=""/>
				<div className="slogan">{this.props.slogan}</div>
			</div>
		)
	}
}