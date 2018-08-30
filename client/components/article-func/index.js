import React from 'react';
import { Link } from 'react-router';
import {post} from '@util/request';
import './index.scss';

export default class HomeArticle extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isLike: props.isLike,
			isCollect: props.isCollect,
			like: props.like,
			chooseLike: '',
			chooseCollect: ''
		}
		this.onLike = this.onLike.bind(this);
		this.onCollect = this.onCollect.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			isLike: nextProps.isLike,
			isCollect: nextProps.isCollect,
			like: nextProps.like
		})
	}
	onLike(){
		if(this.state.isLike){
			post('/like',{id:this.props.id,type:0})
			.then(re=>{
				this.setState({
					isLike: 0,
					like: re.likeCount,
					chooseLike: ''
				})
			})
			
		} else {
			post('/like',{id:this.props.id,type:1})
			.then(re=>{
				this.setState({
					isLike: 1,
					chooseLike: 'choosed',
					like: re.likeCount
				})
			})
		}
	}
	onCollect(){
		if(this.state.isCollect){
			post('/collect',{id:this.props.id,type:0})
			.then(re=>{
				this.setState({
					isCollect: 0,
					chooseCollect:''
				})
			})
			
		} else {
			post('/collect',{id:this.props.id,type:1})
			.then(re=>{
				this.setState({
					isCollect: 1,
					chooseCollect: 'choosed'
				})
			})
			
		}
	}
	render() {
		return (
			<div className="article-func">
				<div className="read"><i className="iconfont icon-yueduliang"></i>{this.props.read}</div>
				<div className="comment"><i className="iconfont icon-pinglun"></i>{this.props.comment}</div>
				<div className="like" onClick={this.onLike}><i className={"iconfont "+this.state.chooseLike+(this.state.isLike ? " liked icon-dianzan" : " icon-31dianzan")}></i>{this.state.like}</div>
				<div className="collect" onClick={this.onCollect}><i className={"iconfont "+this.state.chooseCollect+(this.state.isCollect ? " icon-shoucangxuanzhong collected" : " icon-shoucang")}></i>收藏</div>
			</div>
		)
	}
}