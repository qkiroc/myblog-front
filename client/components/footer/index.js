import React from 'react';
import { Link } from 'react-router'
import './index.scss';

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isShowQQ: false,
			isShowWechat: false
		}
		this.renderQRCode = this.renderQRCode.bind(this);
		this.onShowQQ = this.onShowQQ.bind(this);
		this.onShowWechat = this.onShowWechat.bind(this);
	}
	renderQRCode(type, isShow){
		return (
			<div className="qr-code" style={{opacity: (isShow ? 1:0)}}>
				<img src={require(`@img/${type}-qr-code.png`)} />
			</div>
		)
	}
	onShowQQ(){
		this.setState({
			isShowQQ: this.state.isShowQQ ? false : true
		})
	}
	onShowWechat(){
		this.setState({
			isShowWechat: this.state.isShowWechat ? false : true
		})
	}
	render() {
		return (
			<div className="footer">
				<div className="top">
					<div className="logo">QHY BLOG</div>
					<div className="footer-nav">
						<Link to="/">首页</Link>
						<Link to="/technology">技术小栈</Link>
						<Link to="/about">关于我</Link>
					</div>
					<div className="connect">
						<div className="qq" >
							{this.renderQRCode('qq', this.state.isShowQQ)}
							<i className="iconfont icon-qq" onMouseEnter={this.onShowQQ} onMouseLeave={this.onShowQQ}></i>
						</div>
						<div className="wechat" >
							{this.renderQRCode('wechat', this.state.isShowWechat)}
							<i className="iconfont icon-weixin" onMouseEnter={this.onShowWechat} onMouseLeave={this.onShowWechat}></i>
						</div>
						<div className="github"><a href="https://github.com/qinhaoyan" target="_blank"><i className="iconfont icon-github"></i></a></div>
					</div>
				</div>
				<div className="bottom">
					<div className="copyright">&copy;2017 COPYRIGHT .ALL RIGHT RESERVED BY QIN HAOYAN</div>
				</div>

			</div>
		)
	}
}