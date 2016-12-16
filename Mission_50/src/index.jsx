import ReactDOM from 'react-dom';
import React,{Component} from 'react';
import {Provider}  from 'react-redux';
import {App,Edit,Fill,Head,Home,Show} from './containers';
import configure from './store/configure';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';


const store =configure();

store.subscribe(showstate);

function showstate() {
	console.log("listener");
	console.log(store.getState());
}

const history = syncHistoryWithStore(hashHistory,store);

//由Router控制4个container， Home是默认页面。

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
				<Route path="Edit" component={Edit} />
				<Route path="Fill" component={Fill} />
				<Route path="Show" component={Show}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
	);











