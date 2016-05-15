import { connect } from 'react-redux';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import Feed from 'components/Feed';

import {
    getPerformancesAsArray,
} from 'selectors/performances';

import {
    getAllPoems,
} from 'selectors/poem';

import {
    getAllUsers,
} from 'selectors/user';

const log = debug('ap.FeedContainer'); // eslint-disable-line no-unused-vars

@connect(state => ({
    poems: getAllPoems(state),
    performances: getPerformancesAsArray(state),
    users: getAllUsers(state),
}))
export default class FeedContainer extends Component {
    static propTypes = {
        poems: PropTypes.object,
        performances: PropTypes.array,
        users: PropTypes.object,
    };

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
