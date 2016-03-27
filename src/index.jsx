import debug from 'debug';

// React
import React from 'react';
import ReactDOM from 'react-dom';

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
import LoginContainer from 'containers/LoginContainer';
import ProfileContainer from 'containers/ProfileContainer';

// disable if prod
debug.enable('ap.*');

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <div>
            <Router history={browserHistory}>
                <Route path="/" component={AppContainer}>
                    <IndexRoute component={LoginContainer} />
                    <Route path="/profile" component={ProfileContainer} />
                </Route>
            </Router>
            <DevTools store={store} />
        </div>
    </Provider>
);

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
