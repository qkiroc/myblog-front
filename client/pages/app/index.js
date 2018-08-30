import React from 'react';
import Nav from '@components/nav';
import Footer from '@components/footer';

export default class App extends React.Component {
	render() {
		return (
			<div style={{minHeight: window.innerHeight+200+"px",position: "relative", overflow: "hidden"}}>
				<Nav />
				<div style={{height: '60px'}}></div>
				{this.props.children}
				<div style={{height: "200px",background: "#f9f9fb"}}></div>
				<Footer />
			</div>
			
		)
	}
}