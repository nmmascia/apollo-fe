import debug from 'debug';
import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unsed-vars
import { Grid, Row, Column } from 'react-cellblock';

import AudioRecorderContainer from 'containers/AudioRecorderContainer';

import CurrentPoem from 'components/CurrentPoem';
import ProfileHeader from './ProfileHeader';
import PastPerformances from 'components/PastPerformances';

const log = debug('ap.Profile'); // eslint-disable-line no-unused-vars

export default class Profile extends Component {
    static propTypes = {
        isCurrentUser: PropTypes.bool.isRequired,
        name: PropTypes.string,
        onFollowUser: PropTypes.func.isRequired,
        pastPerformances: PropTypes.array,
        poem: PropTypes.shape({
            author: PropTypes.string.isRequired,
            isLoading: PropTypes.bool.isRequired,
            lines: PropTypes.arrayOf(PropTypes.string).isRequired,
            title: PropTypes.string.isRequired,
        }),
        profilePicture: PropTypes.string,
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
            pastPerformances,
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
                    <Column width="2/3">
                        {this.renderCurrentPoem()}
                    </Column>
                    <Column width="1/3">
                        <Row>
                            <AudioRecorderContainer />
                        </Row>
                        <Row>
                            <PastPerformances
                                performances={pastPerformances}
                            />
                        </Row>
                    </Column>
                </Row>
            </Grid>
        );
    }
}
