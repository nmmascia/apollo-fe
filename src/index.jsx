import 'babel-polyfill';

import debug from 'debug';

// React
import React from 'react';
import { render } from 'react-dom';

// React Router
import { browserHistory, Router } from 'react-router';
import Routes from 'routes';

// Redux
import { Provider } from 'react-redux';
import DevTools from 'utils/DevTools';
import configureStore from 'utils/configureStore';

// disable if prod
debug.enable('ap.*');

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <div>
            <Router history={browserHistory}>
                {Routes}
            </Router>
            <DevTools store={store} />
        </div>
    </Provider>
);

render(
    <Root />,
    document.getElementById('root')
);
