import React from 'react';
import { render } from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// eslint-disable-next-line
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import './css/main.css';

// Components
import Panel from './components/routes/Panel';
import NotFound from './components/routes/NotFound';
import Wines from './components/routes/Wines';
import Wine from './components/routes/Wine';

const store = configureStore();

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Panel}>
				<IndexRoute component={Wines} />
				<Route path="wines/:wineId" component={Wine} />
			</Route>
			<Route path="*" component={NotFound} status={404} />
		</Router>
	</Provider>,
	document.getElementById('root')
);
