import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from '@pages/app';
import Home from '@pages/home';
import About from '@pages/about';
import Technology from '@pages/technology';
import ArticleDetail from '@pages/article-detail';
import Editor from '@pages/editor';
import './index.scss'


ReactDom.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="about" component={About} />
			<Route path="technology">
				<IndexRoute component={Technology}/>
				<Route path="article/:id" component={ArticleDetail}/>
			</Route>
			<Route path="editor" component={Editor}/>
		</Route>
	</Router>
	, document.getElementById('root')
)