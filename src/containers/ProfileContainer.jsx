import { connect } from 'react-redux';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';
import AudioRecorder from 'react-audio-recorder';

import PoemViewer from 'components/PoemViewer';

const log = debug('ap.ProfileContainer'); // eslint-disable-line no-unused-vars

const poem = {
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
    username: state.user.username,
}))
export default class ProfileContainer extends Component {
    static propTypes = {
        username: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div>
                <span>Hello {this.props.username}</span>
                <div>
                    <PoemViewer
                        author={poem.author}
                        title={poem.title}
                        lines={poem.lines}
                    />
                    {/*
                        AudioRecorder not recommended for long audio
                        samples. But we can use this for now until
                        a better solution is neeeded.
                    */}
                    <AudioRecorder
                        onChange={data => log('audio: ', data)}
                    />
                </div>
            </div>
        );
    }
}
