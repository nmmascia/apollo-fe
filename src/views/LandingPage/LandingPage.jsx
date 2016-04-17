import debug from 'debug';
import React from 'react';
import { Grid, Column, Row } from 'react-cellblock';

import LoginContainer from 'containers/LoginContainer';
import RegisterContainer from 'containers/RegisterContainer';
import FeedContainer from 'containers/FeedContainer';

const log = debug('ap.LandingPage'); // eslint-disable-line no-unused-vars

const LandingPage = () => (
    <Grid>
        <Row>
            <Column width="1/2">
                <LoginContainer />
            </Column>
            <Column width="1/2">
                <RegisterContainer />
            </Column>
        </Row>
    </Grid>
);

export default LandingPage;
