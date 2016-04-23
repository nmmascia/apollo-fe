import React from 'react';
import { Route, IndexRoute } from 'react-router';
import debug from 'debug';

import AppContainer from 'containers/AppContainer';
import LandingPage from 'views/LandingPage';
import FeedContainer from 'containers/FeedContainer';
import ProfileContainer from 'containers/ProfileContainer';

const log = debug('ap.Routes'); // eslint-disable-line no-unused-vars

const Routes = (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={LandingPage} />
        <Route path="/feed" component={FeedContainer} />
        <Route path="/profile/:_id" component={ProfileContainer} />
    </Route>
);

export default Routes;
