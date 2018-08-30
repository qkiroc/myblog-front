import React from 'react';
import { Link } from 'react-router';
import Func from '@components/article-func';
import './article.scss';

export default class HomeArticle extends React.Component {
	render() {
		return (
			<div className="home-article">
				<h1 className="title">
					<Link to={"/technology/article/" + this.props.id} >{this.props.title}</Link>
				</h1>
				<div className="time-type">
					<span className="time">{this.props.time}</span>
					<span className="time">{this.props.type}</span>
					<span className="type">{this.props.subtype}</span>
				</div>
				<div className="abstract">
					<p>
						{this.props.abstract}
					</p>
					<div className="show-all">
						<Link to={"/technology/article/" + this.props.id}>阅读全文</Link>
					</div>
				</div>
				<div className="func">
					<Func 
						read={this.props.read} 
						comment={this.props.comment} 
						like={this.props.like} 
						isCollect={this.props.isCollect} 
						isLike={this.props.isLike}
						id={this.props.id}
					/>
				</div>
			</div>
		)
	}
}