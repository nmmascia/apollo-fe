import AudioRecorder from 'react-audio-recorder';
import debug from 'debug';
import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unsed-vars

import PoemViewer from 'components/PoemViewer';
import ProfileHeader from './ProfileHeader';

import styles from './Profile.css';

const log = debug('ap.Profile'); // eslint-disable-line no-unused-vars

export default class Profile extends Component {
    static propTypes = {
        name: PropTypes.string,
        onAudioRecorded: PropTypes.func.isRequired,
        onFollowUser: PropTypes.func.isRequired,
        poem: PropTypes.shape({
            author: PropTypes.string.isRequired,
            lines: PropTypes.arrayOf(PropTypes.string).isRequired,
            title: PropTypes.string.isRequired,
        }),
        username: PropTypes.string.isRequired,
    };

    render() {
        const {
            name,
            onAudioRecorded,
            onFollowUser,
            poem: {
                author,
                lines,
                title,
            },
            username,
        } = this.props;

        return (
            <div>
                <ProfileHeader
                    name={name}
                    username={username}
                    onFollowUser={onFollowUser}
                />
                <PoemViewer
                    author={author}
                    lines={lines}
                    title={title}
                />
                <AudioRecorder
                    onChange={data => onAudioRecorded(data)}
                />
            </div>
        );
    }
}
