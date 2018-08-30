import React from 'react';
import Banner from '@components/banner';
import Aticle from './components/article';
import Comment from './components/comment';
import Loading from '@components/loading';
import {get} from '@util/request';
import './index.scss';

export default class ArticleDetail extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: {},
			slogan: '',
			bannerurl: '',
			isLoad: true,
			errMessage: '',
		}
		get('/getTechnologyMessage')
			.then(re=>{
				this.setState({
					slogan: re.slogan,
					bannerurl: re.bannerurl
				})
			})
		get('/getArticleDetail', {id: this.props.params.id})
			.then(re=>{
				this.setState({
					data: re,
					isLoad: false
				})
			})
			.catch(err=>{
				this.setState({
					isLoad: false,
					errMessage: err
				})
			})
	}
	render() {
		return (
			<div className="article-detail">
				<Banner slogan={this.state.slogan} url={this.state.bannerurl}/>
				<div className="article-detail-content">
					<Loading visible={this.state.isLoad} message={this.state.errMessage}/>
					<Aticle {...this.state.data}/>
				</div>
				<div className="article-detail-comment">
					<Comment id={this.state.data.id}/>
				</div>
			</div>
		)
	}
}