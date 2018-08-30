import React from 'react';
import Banner from '@components/banner';
import {post} from '@util/request';
import showdown from 'showdown';
import hljs from 'highlight.js';
import { browserHistory } from 'react-router'
import './index.scss';

export default class Editor extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			text:'',
			title: '',
		}
		this.converter = new showdown.Converter();
		this.onText = this.onText.bind(this);
		this.onTitle = this.onTitle.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onText(e){
		let text = e.target.value;
		text = text.replace(/\n/g,"\n\n");
		let html = this.converter.makeHtml(text);
		this.setState({
			text: html
		})
		hljs.initHighlighting();
	}
	onTitle(e){
		let title = e.target.value;
		this.setState({
			title: title
		})
	}
	onSubmit(){
		let title = this.refs.title.value;
		let text = this.refs.text.value;
		text = text.replace(/\n/g,"\n\n");
		let html = this.converter.makeHtml(text);
		let type = this.refs.type.value;
		let abstract = this.refs.abstract.value;
		post('/publish',{title,abstract,type,text:html})
			.then(re=>{
				browserHistory.push('/');
			})
			.catch(err=>{
				alert(err);
			})
	}
	render() {

		return (
			<div className="editor">
				<div className="title">
					<div className="input"><span>题目：</span><input type="text" onChange={this.onTitle} ref="title"/></div>
					<div className="show-input">{this.state.title}</div>
				</div>
				<div className="textarea">
					<textarea className="text" onChange={this.onText} ref="text">
					</textarea>
					<div className="showtext" dangerouslySetInnerHTML={{__html: this.state.text}}></div>
				</div>
				<div className="publish">
					<textarea ref="abstract" placeholder="简介"></textarea>
					<div className="type"><span>分类：</span><input type="text" ref="type"/></div>
					<div className="submit" onClick={this.onSubmit}>发布</div>
				</div>
			</div>
		)
	}
}