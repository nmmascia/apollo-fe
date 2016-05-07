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

import {
    requestMedia,
} from 'reducers/recorder';

import { getUserProfile } from 'reducers/actions';

import { getPastPerformancesForUser } from 'selectors/performances';

import Profile from 'components/Profile';

const log = debug('ap.ProfileContainer'); // eslint-disable-line no-unused-vars

let MOCK_URL = null;

const MOCK_PERFORMANCES = [
    {
        id: '1',
        title: 'Hello',
        author: 'mr.hallo',
        dateRecorded: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Hello',
        author: 'mr.hallo',
        dateRecorded: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'Hello',
        author: 'mr.hallo',
        dateRecorded: new Date().toISOString(),
    },
    {
        id: '4',
        title: 'Hello',
        author: 'mr.hallo',
        dateRecorded: new Date().toISOString(),
    },
    {
        id: '5',
        title: 'Hello',
        author: 'mr.hallo',
        dateRecorded: new Date().toISOString(),
    },
];


@connect((state, props) => ({
    isCurrentUser: isCurrentProfileUser(state, props),
    pastPerformances: getPastPerformancesForUser(state, props),
    poem: getProfilePoem(state, props),
    user: getUserInfo(state, props),
    userId: getUserIdFromParams(state, props),
}))
export default class ProfileContainer extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isCurrentUser: PropTypes.bool.isRequired,
        pastPerformances: PropTypes.array,
        poem: PropTypes.shape({
            author: PropTypes.string,
            isLoading: PropTypes.bool,
            id: PropTypes.string,
            lines: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string,
        }).isRequired,
        user: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            profilePicture: PropTypes.string,
            username: PropTypes.string.isRequired,
        }).isRequired,
        userId: PropTypes.string.isRequired,
    };

    componentWillMount() {
        const { dispatch, userId } = this.props;

        dispatch(getUserProfile(userId));

        getAudioUrl('nmmascia/An-Exiles-Farewell.wav')
        .then(response => {
            MOCK_URL = response;
        });

        dispatch(requestMedia());
    }

    render() {
        const {
            isCurrentUser,
            pastPerformances,
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
                onFollowUser={user => log(user)}
                pastPerformances={pastPerformances.map(perf => {
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
