import { connect } from 'react-redux';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import Feed from 'components/Feed';

import { fetchFeed } from 'reducers/feed';

import { getPerformancesAsArray } from 'selectors/performances';
import { getAllPoems } from 'selectors/poem';
import { getAllUsers } from 'selectors/user';
import { getFeedPerformances } from 'selectors/feed';

const log = debug('ap.FeedContainer'); // eslint-disable-line no-unused-vars

@connect(state => ({
    poems: state.poems.poemsById,
    performances: getFeedPerformances(state),
    users: state.users.usersById,
}))
export default class FeedContainer extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        poems: PropTypes.object,
        performances: PropTypes.array,
        users: PropTypes.object,
    };

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchFeed());
    }

    render() {
        const {
            poems,
            performances,
            users,
        } = this.props;

        return (
            <Feed
                poems={poems}
                performances={performances}
                users={users}
            />
        );
    }
}
