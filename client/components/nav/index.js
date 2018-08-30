import React from 'react';
import { Link } from 'react-router';
import './index.scss';

export default class Nav extends React.Component {
	render() {
		return (
			<div className="nav">
				<div className="logo"></div>
				<div className="menu">
					<Link to="/" activeClassName="active" className="link" onlyActiveOnIndex={true}>首页</Link>
					<Link to="/technology" activeClassName="active" className="link">技术小栈</Link>
					<Link to="/about" activeClassName="active" className="link">关于我</Link>
				</div>
			</div>
		)
	}
}