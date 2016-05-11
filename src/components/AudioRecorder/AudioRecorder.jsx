import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import Carousel from 'components/lib/Carousel';
import RecordPanel from 'components/lib/RecordPanel';
import Recording from 'components/lib/Recording';

const log = debug('ap.AudioRecorder'); // eslint-disable-line no-unused-vars

export default class AudioRecorder extends Component {
    static propTypes = {
        currentRecording: PropTypes.number.isRequired,
        currentRecordingDuration: PropTypes.number.isRequired,
        isRecording: PropTypes.bool.isRequired,
        onChangeCurrentRecording: PropTypes.func.isRequired,
        onDeleteRecording: PropTypes.func.isRequired,
        onSaveRecording: PropTypes.func.isRequired,
        onStartRecording: PropTypes.func.isRequired,
        onStopRecording: PropTypes.func.isRequired,
        recordings: PropTypes.array,
    };

    render() {
        const {
            currentRecording,
            currentRecordingDuration,
            isRecording,
            onChangeCurrentRecording,
            onDeleteRecording,
            onSaveRecording,
            onStartRecording,
            onStopRecording,
            recordings,
        } = this.props;

        return (
            <div>
                <RecordPanel
                    duration={currentRecordingDuration}
                    isRecording={isRecording}
                    onStartRecording={onStartRecording}
                    onStopRecording={onStopRecording}
                />
                <Carousel
                    current={currentRecording}
                    items={recordings}
                    itemRenderer={Recording}
                    itemProps={{
                        onSaveRecording,
                        onDeleteRecording,
                    }}
                    onGoToNext={() => onChangeCurrentRecording(1)}
                    onGoToPrevious={() => onChangeCurrentRecording(-1)}
                />
            </div>
        );
    }
}
