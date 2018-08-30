import React from 'react';
import Banner from '@components/banner';
import {get} from '@util/request';
import './index.scss';

export default class About extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			picAnimate: '',
			pastTimeTitle: '',
			pastTime: '',
			slogan: '',
			bannerurl: '',
			pic1url: '',
			pic2url: '',
			pic3url: '',
		}
		get('/getAboutMessage')
		.then(re=>{
			this.setState({
				slogan: re.slogan,
				bannerurl: re.bannerurl,
				pic1url: re.pic1url,
				pic2url: re.pic2url,
				pic3url: re.pic3url,
			})
		})
		this.listenWheel = this.listenWheel.bind(this);
	}
	listenWheel(e){

		if((this.refs.picshow.clientHeight + this.refs.picshow.offsetTop - window.pageYOffset ) < window.innerHeight){
			this.setState({
				picAnimate: 'pic-animate'
			})
		}
		if((this.refs.pastTimeTitle.clientHeight + this.refs.pastTimeTitle.offsetTop - window.pageYOffset ) < window.innerHeight){
			this.setState({
				pastTimeTitle: 'past-time-title'
			})
			
		}
		if((this.refs.pastTime.clientHeight/2+ this.refs.pastTime.offsetTop - window.pageYOffset ) < window.innerHeight){
			this.setState({
				pastTime: 'past-time-animate'
			})
		}	

	}
	renderPoint(type, top, className){
		return (
			<div className={"point "+className} style={{top: top+"px"}}>
				<i className={"iconfont icon-jiantouxi "+type+1}></i>
				<i className={"iconfont icon-jiantouxi "+type+2}></i>
				<div className="point-in"></div>
			</div>
		)
	}
	render() {
		return (
			<div className="about" onWheel={this.listenWheel} >
				<Banner  slogan={this.state.slogan} url={this.state.bannerurl}/>
				<div className="title" >
					<div className="title-english">ABOUT ME</div>
					<div className="title-chinese">关于·我</div>
				</div>
				<div className="abstract">
					<p className="abstract1">始于艺术，终于前端，向往美好之物，致力于最极致的前端体验</p>
					<p className="abstract2">热衷于互联网前沿技术，享受生活的点点滴滴</p>
				</div>
				<div className={"picshow "+this.state.picAnimate} ref="picshow">
					<div className="pic1">
						<img src={this.state.pic1url} />
					</div>
					<div className="pic2">
						<img src={this.state.pic2url} />
					</div>
					<div className="pic3">
						<img src={this.state.pic3url} />
					</div>
				</div>
				<div className="past-time-out">
					<div className={"sub-title "+this.state.pastTimeTitle} ref="pastTimeTitle" >
						<div className="sub-title-english">
							PAST TIME
						</div>
						<div className="sub-title-chinese">
							过往印迹
						</div>
					</div>
					<div className={"past-time "+this.state.pastTime} ref="pastTime" >
						<div className="left">
							<div style={{top: "60px"}} className="past-time1"> 
								<p className="text-right">大一</p>
								<p className="text-right">加入重庆邮电大学学生会文化创意部</p>
								<p className="text-right">学习<span className="strong">PS、PR、AE、C4D</span>等多媒体软件</p>
								<p className="text-right">参与制作多个活动的海报和视频</p>
							</div>
							<div style={{top: "300px"}} className="past-time3"> 
								<p className="text-right">大三</p>
								<p className="text-right">留任校学生会<span className="strong">宣传部部长</span></p>
								<p className="text-right">组建首支web研发团队</p>
								<p className="text-right">带领研发多款web应用 最高访问量2w+</p>
							</div>
						</div>
						<div className="center">
							{this.renderPoint("left", 75, 'point1')}
							{this.renderPoint("right", 195, 'point2')}
							{this.renderPoint("left", 315, 'point3')}
							{this.renderPoint("right", 435, 'point4')}
						</div>
						<div className="right">
							<div style={{top: "180px"}} className="past-time2">
								<p>大二</p>
								<p>加入<span className="strong">电子证据与数据保全实验室前端组</span></p>
								<p>担任前端组组长</p>
								<p>带领完成多个商用项目</p>
							</div>
							<div style={{top: "420px"}} className="past-time4">
								<p><span className="strong">阿里巴巴实习前端工程师</span></p>
								<p>2018.07-2018.08</p>
								<p>参与新零售工作台迭代优化</p>
								<p>参与工作台平台化</p>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		)
	}
}