import debug from 'debug';
import React, { Component, PropTypes } from 'react';
import { Grid, Column, Row } from 'react-cellblock';
import { connect } from 'react-redux';

import LoginContainer from 'containers/LoginContainer';
import RegisterContainer from 'containers/RegisterContainer';
import FeedContainer from 'containers/FeedContainer';

import { goToUserProfile } from 'reducers/actions';

import { getCurrentUserId } from 'selectors/user';

const log = debug('ap.LandingPage'); // eslint-disable-line no-unused-vars

@connect(state => ({
    currentUserId: getCurrentUserId(state),
}))
export default class LandingPage extends Component {
    static propTypes = {
        currentUserId: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const { currentUserId, dispatch } = this.props;

        if (currentUserId) {
            dispatch(goToUserProfile(currentUserId));
        }
    }

    render() {
        return (
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
    }
};
