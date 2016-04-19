import { connect } from 'react-redux';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import {
    getUserIdFromParams,
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

import {
    getAudioUrl,
} from 'utils/aws-s3-service';

import Profile from 'components/Profile';

const log = debug('ap.ProfileContainer'); // eslint-disable-line no-unused-vars

let MOCK_URL = null;

const MOCK_PERFORMANCES = [
    {
        _id: '1',
        title: 'Hello',
        author: 'mr.hallo',
        dateRecorded: new Date().toISOString(),
    },
    {
        _id: '2',
        title: 'Hello',
        author: 'mr.hallo',
        dateRecorded: new Date().toISOString(),
    },
    {
        _id: '3',
        title: 'Hello',
        author: 'mr.hallo',
        dateRecorded: new Date().toISOString(),
    },
    {
        _id: '4',
        title: 'Hello',
        author: 'mr.hallo',
        dateRecorded: new Date().toISOString(),
    },
    {
        _id: '5',
        title: 'Hello',
        author: 'mr.hallo',
        dateRecorded: new Date().toISOString(),
    },
];


@connect((state, props) => ({
    isCurrentUser: isCurrentProfileUser(state, props),
    poem: getProfilePoem(state, props),
    user: getUserInfo(state, props),
    userId: getUserIdFromParams(state, props),
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
        user: PropTypes.shape({
            name: PropTypes.string,
            profilePicture: PropTypes.string,
            username: PropTypes.string.isRequired,
        }).isRequired,
        userId: PropTypes.string.isRequired,
    };

    componentWillMount() {
        const { dispatch, userId } = this.props;
        dispatch(fetchUser(userId));
        dispatch(fetchPoem('56f5cf810647d37a244bbeb2'));
        getAudioUrl('56eb719c4c9ee0096dc379f5/56f5cf810647d37a244bc325.wav')
        .then(response => {
            MOCK_URL = response;
        });
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
                pastPerformances={MOCK_PERFORMANCES.map(perf => {
                    const withAudio = perf;
                    withAudio.url = MOCK_URL;
                    return withAudio;
                })}
                profilePicture={profilePicture}
                poem={poem}
                username={username}
            />
        );
    }
}
