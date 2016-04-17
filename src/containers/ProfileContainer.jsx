import { connect } from 'react-redux';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import {
    getUserInfo,
    isCurrentUser as isCurrentProfileUser,
} from 'selectors/user';

import {
    getProfilePoem,
} from 'selectors/poem';

import {
    fetchPoem,
} from 'reducers/poems';

import {
    fetchUser,
} from 'reducers/users';

import Profile from 'components/Profile';

const log = debug('ap.ProfileContainer'); // eslint-disable-line no-unused-vars

@connect((state, props) => ({
    isCurrentUser: isCurrentProfileUser(state, props),
    poem: getProfilePoem(state, props),
    user: getUserInfo(state, props),
    userId: props.routeParams._id,
}))
export default class ProfileContainer extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isCurrentUser: PropTypes.bool.isRequired,
        poem: PropTypes.shape({
            author: PropTypes.string.isRequired,
            lines: PropTypes.arrayOf(PropTypes.string).isRequired,
            title: PropTypes.string.isRequired,
            isLoading: PropTypes.bool.isRequired,
        }),
        routeParams: PropTypes.shape({
            _id: PropTypes.string,
        }),
        user: PropTypes.shape({
            name: PropTypes.string,
            profilePicture: PropTypes.string,
            username: PropTypes.string.isRequired,
        }).isRequired,
    };

    componentWillMount() {
        const { dispatch, userId } = this.props;
        dispatch(fetchUser(userId));
        dispatch(fetchPoem('56f5cf810647d37a244bbeb2'));
    }

    render() {
        const {
            isCurrentUser,
            poem,
            user: {
                name,
                profilePicture,
                username,
            },
        } = this.props;

        return (
            <Profile
                isCurrentUser={isCurrentUser}
                name={name}
                onAudioRecorded={data => log(data)}
                onFollowUser={user => log(user)}
                profilePicture={profilePicture}
                poem={poem}
                username={username}
            />
        );
    }
}
