import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Audio from 'components/lib/Audio';

import {
    requestMedia,
    startRecording,
    stopRecording,
} from 'reducers/recorder';

@connect(state => ({
    isRecording: state.recorder.isRecording,
    recordings: state.recorder.recordings,
}))
export default class AudioRecorderContainer extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isRecording: PropTypes.bool.isRecording,
        recordings: PropTypes.array,
    };

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(requestMedia());
    }

    handleStart() {
        const { dispatch } = this.props;
        dispatch(startRecording());
    }

    handleStop() {
        const { dispatch } = this.props;
        dispatch(stopRecording());
    }

    render() {
        return (
            <div>
                <button onClick={::this.handleStart}>Record</button>
                <button onClick={::this.handleStop}>Stop</button>
                {this.props.recordings.map((rec, i) => {
                    return <Audio key={i} src={rec} />;
                })}
            </div>
        );
    }
}
