import React from 'react';
import Emoji from '@components/emoji';
import CommentContent from './commentContent';
import {get,post} from '@util/request';
import './comment.scss';

export default class Comment extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			emojiVisible: false,
			commentData: []
		}
		//this.getComment();
		this.showEmoji = this.showEmoji.bind(this);
		this.hiddenEmoji = this.hiddenEmoji.bind(this);
		this.emojiList = this.emojiList.bind(this);
		this.renderComment = this.renderComment.bind(this);
		this.onComment = this.onComment.bind(this);
	}
	getComment(id){
		get('/getComment', {id: id})
			.then(re=>{
				this.setState({
					commentData: re.list
				})
			})
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.id){
			this.getComment(nextProps.id);
		}
		
	}
	componentDidMount() {
		document.addEventListener('click', this.hiddenEmoji);
	}
	hiddenEmoji(e){
		this.setState({
			emojiVisible: false
		})
	}
	showEmoji(e){
		e.nativeEvent.stopImmediatePropagation()
		if(this.state.emojiVisible){
			this.setState({
				emojiVisible: false
			})
		}
		else{
			this.setState({
				emojiVisible: true
			})
		}
	}
	emojiList(e,emoji){
		e.nativeEvent.stopImmediatePropagation();
		this.refs.comment.value += emoji;
	}
	onComment(){
		let comment = this.refs.comment.value;
		if(comment){
			post('/comment',{id:this.props.id, comment})
			.then(re=>{
				alert('评论成功');
				this.getComment(this.props.id);
			})
			.catch(err=>{
				alert("评论失败");
			})
		}
	}
	renderComment(){
		let comments = this.state.commentData.map((re, i)=>(
			<CommentContent key={i} {...re}/>
		));
		return comments;
	}
	render() {
		return (
			<div className="comment">
				<div className="input">
					<textarea ref="comment" placeholder="说点什么吧..." /*onChange={this.textChange}*/></textarea>
					<div className="emoji-summit">
						<div className="emoji" onClick={this.showEmoji}><i className="iconfont icon-emoji_icon"></i> 表情</div>
						<div className="summit" onClick={this.onComment}><i className="iconfont icon-pinglun1"></i> 评论</div>
					</div>
					<Emoji visible={this.state.emojiVisible} choose={this.emojiList} />
				</div>
				<div className="comment-contents">
					{this.renderComment()}
				</div>
			</div>
		)
	}
}