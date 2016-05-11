import debug from 'debug';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AudioRecorder from 'components/AudioRecorder';

import {
    requestMedia,
    startRecording,
    stopRecording,
    deleteRecording,
    startTicking,
    stopTicking,
} from 'reducers/recorder';

import {
    updateCurrent,
} from 'reducers/carousel';

import {
    createPerformance,
} from 'reducers/performances';

import {
    getNextProfileState,
} from 'reducers/actions';

import {
    convertRecordingsToArray,
} from 'selectors/recordings';

const log = debug('ap.AudioRecorderContainer'); // eslint-disable-line no-unused-vars

@connect(state => ({
    currentRecording: state.carousel.current,
    currentRecordingDuration: state.recorder.recordingDuration,
    isRecording: state.recorder.isRecording,
    recordings: convertRecordingsToArray(state),
}))
export default class AudioRecorderContainer extends Component {
    static propTypes = {
        currentRecording: PropTypes.number.isRequired,
        currentRecordingDuration: PropTypes.number.isRequired,
        dispatch: PropTypes.func.isRequired,
        isRecording: PropTypes.bool.isRequired,
        recordings: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            dateRecorded: PropTypes.date,
            src: PropTypes.string,
        })),
    };

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(requestMedia());
    }

    handleStart() {
        const { dispatch } = this.props;
        dispatch(startRecording());
        dispatch(startTicking());
    }

    handleStop() {
        const { dispatch } = this.props;
        dispatch(stopRecording());
        dispatch(stopTicking());
    }

    handleChangeCurrentRecording(value) {
        const { dispatch } = this.props;
        dispatch(updateCurrent(value));
    }

    handleDeleteRecording(id) {
        const { dispatch } = this.props;
        dispatch(deleteRecording(id));
    }

    handleSaveRecording(id) {
        const { dispatch } = this.props;
        dispatch(getNextProfileState(id));
    }

    render() {
        const {
            currentRecording,
            currentRecordingDuration,
            isRecording,
            recordings,
        } = this.props;

        return (
            <AudioRecorder
                currentRecording={currentRecording}
                currentRecordingDuration={currentRecordingDuration}
                isRecording={isRecording}
                onChangeCurrentRecording={::this.handleChangeCurrentRecording}
                onDeleteRecording={::this.handleDeleteRecording}
                onSaveRecording={::this.handleSaveRecording}
                onStartRecording={::this.handleStart}
                onStopRecording={::this.handleStop}
                recordings={recordings}
            />
        );
    }
}
