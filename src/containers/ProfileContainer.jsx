import AudioRecorder from 'react-audio-recorder';
import { connect } from 'react-redux';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import Profile from 'components/Profile';

const log = debug('ap.ProfileContainer'); // eslint-disable-line no-unused-vars

const MOCK_POEM = {
    title: 'Tho\' I get home how late -- how late',
    author: 'Emily Dickinson',
    linecount: 13,
    lines: [
        'Tho\' I get home how late -- how late --',
        'So I get home - \'twill compensate --',
        'Better will be the Ecstasy',
        'That they have done expecting me --',
        'When Night -- descending -- dumb -- and dark --',
        'They hear my unexpected knock --',
        'Transporting must the moment be --',
        'Brewed from decades of Agony!',
        '',
        'To think just how the fire will burn --',
        'Just how long-cheated eyes will turn --',
        'To wonder what myself will say,',
        'And what itself, will say to me --',
        'Beguiles the Centuries of way!',
    ],
};

@connect(state => ({
    name: state.user.name,
    poem: MOCK_POEM,
    username: state.user.username,
}))
export default class ProfileContainer extends Component {
    static propTypes = {
        name: PropTypes.string,
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
            poem,
            username,
        } = this.props;

        return (
            <Profile
                name={name}
                onAudioRecorded={data => log(data)}
                onFollowUser={user => log(user)}
                poem={poem}
                username={username}
            />
        );
    }
}
