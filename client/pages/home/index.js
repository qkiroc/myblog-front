import React from 'react';
import Banner from '@components/banner';
import HomeContent from '@components/home-content';
import {get} from '@util/request';
import './index.scss';

export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			slogan: '',
			bannerurl: '',
		}
		get('/getHomeMessage')
		.then(re=>{
			this.setState({
				slogan: re.slogan,
				bannerurl: re.bannerurl
			})
		})
	}
	render() {
		return (
			<div className="home">
				<Banner slogan={this.state.slogan} url={this.state.bannerurl}/>
				<HomeContent />
			</div>
		)
	}
}