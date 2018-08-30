import React from 'react';
import {post} from '@util/request';
import './commentContent.scss';

export default class CommentContent extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			isLike: props.isLike,
			liken: props.liken,
			chooseLike: ''
		}
		this.onLike = this.onLike.bind(this);
	}
	onLike(){
		if(this.state.isLike){
			post('/commentLike', {id:this.props.id, type:0})
			.then(re=>{
				this.setState({
					isLike: 0,
					liken: re.likeCount,
					chooseLike: ''
				})
			})
		} else {
			post('/commentLike',{id:this.props.id,type:1})
			.then(re=>{
				this.setState({
					isLike: 1,
					chooseLike: 'choosed',
					liken: re.likeCount
				})
			})
		}
	}
	render() {
		return (
			<div className="comment-content">
				<div className="head">
					<img src={this.props.headUrl} onError={(e)=>{e.target.src = require('@img/TB1ld1GNFXXXXXLapXXXXXXXXXX-200-200.png')}}/>
				</div>
				<div className="right">
					<div className="name">{this.props.name}</div>
					<div className="text">{this.props.text}</div>
					<div className="time-like">
						<div className="time">{this.props.time}</div>
						<div className="like" onClick={this.onLike}><i className={"iconfont "+this.state.chooseLike+(this.state.isLike ? " liked icon-dianzan" : " icon-31dianzan")}></i> {this.state.liken}</div>
					</div>
				</div>
			</div>
		)
	}
}