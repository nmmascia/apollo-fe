import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import Audio from 'components/lib/Audio';
import Carousel from 'components/lib/Carousel';
import RecordButton from 'components/lib/RecordButton';
import Recording from 'components/lib/Recording';

import styles from './AudioRecorder.css';

const log = debug('ap.AudioRecorder'); // eslint-disable-line no-unused-vars

export default class AudioRecorder extends Component {
    static propTypes = {
        currentRecording: PropTypes.number.isRequired,
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
            isRecording,
            onChangeCurrentRecording,
            onDeleteRecording,
            onSaveRecording,
            onStartRecording,
            onStopRecording,
            recordings,
        } = this.props;

        return (
            <div className={styles.container}>
                <h1>Record Current Poem!</h1>
                <div>
                    <RecordButton
                        isRecording={isRecording}
                        onClick={isRecording ? onStopRecording : onStartRecording}
                    />
                </div>
                <div>
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
            </div>
        );
    }
}
