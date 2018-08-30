import React from 'react';
import './index.scss';
import Banner from '@components/banner';
import Article from '@components/home-content/components/article';
import Loading from '@components/loading';
import {get} from '@util/request';

export default class Technology extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			typeKey: '',
			classifyData: [],
			articleDate: [],
			isLoad: true,
			errMessage: '',
			slogan: '',
			bannerurl: '',
		}
		get('/getTechnologyMessage')
			.then(re=>{
				this.setState({
					slogan: re.slogan,
					bannerurl: re.bannerurl
				})
			})
		get('/getClassify')
			.then(re=>{
				this.setState({
					classifyData: re.list
				})
			})
		get('/getArticle', {type:'technology'})
			.then(re=>{
				this.setState({
					isLoad: false,
					articleDate: re.list
				})
			})
			.catch(err=>{
				this.setState({
					isLoad: false,
					errMessage: err
				})
			})
		this.renderSearch = this.renderSearch.bind(this);
		this.renderClassify = this.renderClassify.bind(this);
		this.renderAticle = this.renderAticle.bind(this);
		this.chooseType = this.chooseType.bind(this);
		this.onSearch = this.onSearch.bind(this);
	}
	chooseType(type){
		this.setState({
			isLoad:true,
			errMessage: ''
		})
		get('/getArticle', {type:'technology', subtype: type})
			.then(re=>{
				this.setState({
					typeKey: type,
					articleDate: re.list,
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
	onSearch(){
		let search = this.refs.search.value;
		console.log(search);
		this.setState({
			isLoad:true,
			errMessage: ''
		})
		get('/getArticle', {type:'technology', subtype: search})
			.then(re=>{
				this.setState({
					typeKey: search,
					articleDate: re.list,
					isLoad: false
				})
			})
			.catch(err=>{
				this.setState({
					isLoad: false,
					errMessage: err,
					articleDate: [],
					typeKey: ''
				})
			})
	}
	renderSearch(){
		return (
			<div>
				<input 
					type="text" 
					ref="search" 
					placeholder="输入关键词" 
					onKeyPress={e=>{
						if(e.key === 'Enter'){
							this.onSearch()
						}
					}}/>
				<span className="search-button" onClick={this.onSearch}><i className="iconfont icon-sousuo"></i></span>
			</div>
		)
	}
	renderClassify(){
		let classify = this.state.classifyData.map((re, i)=>(
			<div className="con" key={i} onClick={()=>{this.chooseType(re.type)}}>
				<div className="type">{re.type}</div>
				<div className="count">{re.count}</div>
			</div>
			
		))
		return (
			<div>
				<div className="title">博客分类</div>
				{classify}
			</div>
		)
	}
	renderAticle(){
		return this.state.articleDate.map((re,i)=>{
			return <Article {...re} key={i} />
		})
	}
	render() {
		return (
			<div className="technology">
				<Banner slogan={this.state.slogan} url={this.state.bannerurl}/>
				<div className="technology-content">
					<div className="left">
						{this.state.typeKey ? <div className="article-type">{this.state.typeKey}</div> : null}
						<Loading visible={this.state.isLoad} message={this.state.errMessage}/>
						{this.renderAticle()}
					</div>
					<div className="right">
						<div className="search">
							{this.renderSearch()}
						</div>
						<div className="classify">
							{this.renderClassify()}
						</div>
					</div>
					<div className="clear"></div>
				</div>
			</div>
		)
	}
}