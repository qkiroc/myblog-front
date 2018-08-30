import React from 'react';
import './index.scss';

export default class Emoji extends React.Component {
	render() {
		const data = ['😊','😄','😂','😆','😃','😁','😭','😢','😣','😎','😳','😘','😝','😍','🙄️','😮','🙃','😷','😏','😒','😪','😨','😱','😡','🤔','😒','🤢','🤮','👋','🙏','✌','👎','🤝','👍','❤️','💔','🌹','🎉','🐂','🍺'];
		let emojiHtml = data.map((re,i)=>(
			<div className="emoji" onClick={(e)=>this.props.choose(e,re)} key={i}>{re}</div>
		))
		return (
			<div className={ this.props.visible ?  "show-emoji" : "hidden-emoji"} >
				{emojiHtml}
			</div>
		)
	}
}