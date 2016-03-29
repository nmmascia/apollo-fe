import debug from 'debug';

// React
import React from 'react';
import { render } from 'react-dom';

// React Router
import {
    browserHistory,
    IndexRoute,
    Router,
    Route,
} from 'react-router';

// Redux
import { Provider } from 'react-redux';
import DevTools from 'utils/DevTools';
import configureStore from 'utils/configureStore';

import AppContainer from 'containers/AppContainer';
import ProfileContainer from 'containers/ProfileContainer';

// disable if prod
debug.enable('ap.*');

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <div>
            <Router history={browserHistory}>
                <Route path="/" component={AppContainer}>
                    <IndexRoute component={ProfileContainer} />
                    <Route path="/profile(/:_id)" component={ProfileContainer} />
                </Route>
            </Router>
            <DevTools store={store} />
        </div>
    </Provider>
);

render(
    <Root />,
    document.getElementById('root')
);
