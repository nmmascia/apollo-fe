import { connect } from 'react-redux';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import Profile from 'components/Profile';

import { requestMedia } from 'reducers/recorder';
import { getUserProfile } from 'reducers/actions';

import {
    getUserIdFromParams,
    getUserInfo,
    isCurrentUser as isCurrentProfileUser,
} from 'selectors/user';

import { getPastPerformancesForUser } from 'selectors/performances';
import { getProfilePoem } from 'selectors/poem';

const log = debug('ap.ProfileContainer'); // eslint-disable-line no-unused-vars

@connect((state, props) => ({
    isCurrentUser: isCurrentProfileUser(state, props),
    isLoadingPastPerformances: state.performances.isLoadingPerformances,
    pastPerformances: getPastPerformancesForUser(state, props),
    poem: getProfilePoem(state, props),
    user: getUserInfo(state, props),
    userId: getUserIdFromParams(state, props),
}))
export default class ProfileContainer extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isCurrentUser: PropTypes.bool.isRequired,
        isLoadingPastPerformances: PropTypes.bool.isRequired,
        pastPerformances: PropTypes.array,
        poem: PropTypes.shape({
            author: PropTypes.string,
            id: PropTypes.string,
            lines: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string,
        }).isRequired,
        user: PropTypes.shape({
            avatar: PropTypes.string,
            id: PropTypes.string,
            name: PropTypes.string,
            username: PropTypes.string.isRequired,
        }).isRequired,
        userId: PropTypes.string.isRequired,
    };

    componentWillMount() {
        const { dispatch, userId } = this.props;
        dispatch(getUserProfile(userId));
        dispatch(requestMedia());
    }

    render() {
        const {
            isCurrentUser,
            isLoadingPastPerformances,
            pastPerformances,
            poem,
            user: {
                name,
                avatar,
                username,
            },
        } = this.props;

        return (
            <Profile
                isCurrentUser={isCurrentUser}
                isLoadingPastPerformances={isLoadingPastPerformances}
                name={name}
                onFollowUser={user => log(user)}
                pastPerformances={pastPerformances}
                profilePicture={avatar}
                poem={poem}
                username={username}
            />
        );
    }
}
