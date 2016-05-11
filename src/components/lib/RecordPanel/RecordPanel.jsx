import debug from 'debug';
import React, { PropTypes } from 'react';
import { Grid, Column, Row } from 'react-cellblock';

import RecordButton from 'components/lib/RecordButton';

import styles from './RecordPanel.css';

const log = debug('ap.RecordPanel'); // eslint-disable-line no-unused-vars

const convertDuration = duration => {
    const minutes = Math.floor(duration / 60);
    let remainder = duration - minutes * 60;
    if (remainder < 10) remainder = `0${remainder}`;
    return `${minutes}:${remainder}`;
};

const RecordPanel = ({ duration, isRecording, onStartRecording, onStopRecording }) => {
    return (
        <div className={styles.container}>
            <Row>
                <Column>
                    <div className={styles.recordButton}>
                        <RecordButton
                            isRecording={isRecording}
                            onClick={isRecording ? onStopRecording : onStartRecording}
                        />
                    </div>
                    <span className={styles.text}>
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </span>
                    <span className={styles.duration}>
                        {convertDuration(duration)}
                    </span>
                </Column>
            </Row>
        </div>
    );
};

RecordPanel.propTypes = {
    duration: PropTypes.number,
    isRecording: PropTypes.bool.isRequired,
    onStartRecording: PropTypes.func.isRequired,
    onStopRecording: PropTypes.func.isRequired,
};

export default RecordPanel;
