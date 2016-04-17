import debug from 'debug';
import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unsed-vars
import { Grid, Row, Column } from 'react-cellblock';

import CurrentPoem from 'components/CurrentPoem';
import ProfileHeader from './ProfileHeader';
import PastPerformances from 'components/PastPerformances';

const log = debug('ap.Profile'); // eslint-disable-line no-unused-vars

const MOCK_PERFORMANCES = [
    {
        _id: '1',
        title: 'Hello',
        author: 'mr.hallo',
        url: 'https://s3.amazonaws.com/apollo-development/56eb719c4c9ee0096dc379f5/56f5cf810647d37a244bc325.wav',
        dateRecorded: new Date().toISOString(),
    },
    {
        _id: '2',
        title: 'Hello',
        author: 'mr.hallo',
        url: '/audio.mp3',
        dateRecorded: new Date().toISOString(),
    },
    {
        _id: '3',
        title: 'Hello',
        author: 'mr.hallo',
        url: '/audio.mp3',
        dateRecorded: new Date().toISOString(),
    },
    {
        _id: '4',
        title: 'Hello',
        author: 'mr.hallo',
        url: '/audio.mp3',
        dateRecorded: new Date().toISOString(),
    },
    {
        _id: '5',
        title: 'Hello',
        author: 'mr.hallo',
        url: '/audio.mp3',
        dateRecorded: new Date().toISOString(),
    },
];

export default class Profile extends Component {
    static propTypes = {
        isCurrentUser: PropTypes.bool.isRequired,
        name: PropTypes.string,
        onAudioRecorded: PropTypes.func.isRequired,
        onFollowUser: PropTypes.func.isRequired,
        poem: PropTypes.shape({
            author: PropTypes.string.isRequired,
            isLoading: PropTypes.bool.isRequired,
            lines: PropTypes.arrayOf(PropTypes.string).isRequired,
            title: PropTypes.string.isRequired,
        }),
        profilePicture: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    };

    renderCurrentPoem() {
        const {
            onAudioRecorded,
            poem: {
                author,
                isLoading,
                lines,
                title,
            },
        } = this.props;

        if (isLoading) return <div>Loading...</div>;

        return (
            <CurrentPoem
                author={author}
                lines={lines}
                onAudioRecorded={onAudioRecorded}
                title={title}
            />
        );
    }

    render() {
        const {
            isCurrentUser,
            name,
            onFollowUser,
            profilePicture,
            username,
        } = this.props;

        return (
            <Grid gutterWidth={10}>
                <Row>
                    <ProfileHeader
                        isCurrentUser={isCurrentUser}
                        name={name}
                        onFollowUser={onFollowUser}
                        profilePicture={profilePicture}
                        username={username}
                    />
                </Row>
                <Row>
                    <Column width="5/7">
                        {this.renderCurrentPoem()}
                    </Column>
                    <Column width="2/7">
                        <PastPerformances
                            performances={MOCK_PERFORMANCES}
                        />
                    </Column>
                </Row>
            </Grid>
        );
    }
}
