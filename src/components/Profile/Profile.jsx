import debug from 'debug';
import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unsed-vars
import { Grid, Row, Column } from 'react-cellblock';

import AudioRecorderContainer from 'containers/AudioRecorderContainer';

import CurrentPoem from 'components/CurrentPoem';
import ProfileHeader from './ProfileHeader';
import PastPerformances from 'components/PastPerformances';

import styles from './Profile.css';

const log = debug('ap.Profile'); // eslint-disable-line no-unused-vars

export default class Profile extends Component {
    static propTypes = {
        isCurrentUser: PropTypes.bool.isRequired,
        isLoadingPastPerformances: PropTypes.bool.isRequired,
        name: PropTypes.string,
        onFollowUser: PropTypes.func.isRequired,
        pastPerformances: PropTypes.array,
        poem: PropTypes.shape({
            author: PropTypes.string.isRequired,
            lines: PropTypes.arrayOf(PropTypes.string).isRequired,
            title: PropTypes.string.isRequired,
        }),
        profilePicture: PropTypes.string,
        username: PropTypes.string.isRequired,
    };

    renderAudioRecorder() {
        const { isCurrentUser } = this.props;

        if (isCurrentUser) {
            return <AudioRecorderContainer />;
        }

        return null;
    }

    renderCurrentPoem() {
        const {
            poem: {
                author,
                lines,
                title,
            },
        } = this.props;

        return (
            <CurrentPoem
                author={author}
                lines={lines}
                title={title}
            />
        );
    }

    render() {
        const {
            isCurrentUser,
            isLoadingPastPerformances,
            name,
            onFollowUser,
            pastPerformances,
            profilePicture,
            username,
        } = this.props;

        return (
            <Grid className={styles.container} gutterWidth={10}>
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
                            {this.renderAudioRecorder()}
                        </Row>
                        <Row>
                            <PastPerformances
                                isLoadingPastPerformances={isLoadingPastPerformances}
                                performances={pastPerformances}
                            />
                        </Row>
                    </Column>
                </Row>
            </Grid>
        );
    }
}
