import React from 'react';
import {get} from '@util/request';
import Loading from '@components/loading';
import './index.scss';

import Article from './components/article'

export default class HomeContent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: [],
			isLoad: true,
			message: ''
		}
		get('/getArticle',{type:'all'})
		.then(re=>{
			this.setState({
				isLoad: false,
				data: re.list
			})
		})
		.catch(err=>{
			this.setState({
				isLoad: false,
				message: err,
			})
		})
	}
	render() {
		let article = this.state.data.map((re, i)=>{
			return <Article {...re} key={i}/>
		})
		return (
			<div className="content">
				<Loading visible={this.state.isLoad} message={this.state.message}/>
				{article}
			</div>

		)
	}
}