import React from 'react';
import showdown from 'showdown';
import hljs from 'highlight.js';
import Func from '@components/article-func';
import './article.scss';

export default class Article extends React.Component {
	componentDidMount() {
		hljs.initHighlightingOnLoad();
	}
	keywordRender(){
		let data = this.props.tags || [];
		let keyword = data.map((re,i)=>(
			<div key={i}>{re}</div>
		))
		return keyword;
	}
	render() {

		return (
			<div className="content-article">
				<div className="title">
					{this.props.title}
				</div>
				<div className="time-type">
					<span className="time">{this.props.time}</span>
					<span className="space">·</span>
					<span className="type">{this.props.subtype}</span>
				</div>
				<div className="content" dangerouslySetInnerHTML={{__html: this.props.content}}></div>
				<div className="func">
					<div className="keyword">
						{this.keywordRender()}
					</div>
					<Func 
						{...this.props.func} 
					/>
				</div>
			</div>
		)
	}
}
