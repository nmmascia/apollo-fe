import { connect } from 'react-redux';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import Profile from 'components/Profile';

import {
    getUserInfo,
    isCurrentUser as isCurrentProfileUser,
} from 'reducers/users';

const log = debug('ap.ProfileContainer'); // eslint-disable-line no-unused-vars

@connect((state, props) => ({
    isCurrentUser: isCurrentProfileUser(state, props),
    poem: state.poems.poemsById['56f5cf830647d37a244bca66'],
    user: getUserInfo(state, props),
}))
export default class ProfileContainer extends Component {
    static propTypes = {
        isCurrentUser: PropTypes.bool.isRequired,
        poem: PropTypes.shape({
            author: PropTypes.string.isRequired,
            lines: PropTypes.arrayOf(PropTypes.string).isRequired,
            title: PropTypes.string.isRequired,
        }),
        user: PropTypes.shape({
            name: PropTypes.string,
            profilePicture: PropTypes.string,
            username: PropTypes.string,
        }).isRequired,
    };

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
