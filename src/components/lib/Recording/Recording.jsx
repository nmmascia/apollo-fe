import React, { PropTypes } from 'react';

import Audio from 'components/lib/Audio';

import styles from './Recording.css';

const Recording = props => {
    return (
        <div>
            <span>{props.dateRecorded.toString()}</span>
            <Audio src={props.src} />
            <div className={styles.controlPanel}>
                <div
                    className={styles.controlButton}
                    onClick={() => props.onSaveRecording(props.id)}
                >
                    Save
                </div>
                <div
                    className={styles.controlButton}
                    onClick={() => props.onDeleteRecording(props.id)}
                >
                    Delete
                </div>
            </div>
        </div>
    );
};

Recording.propTypes = {
    dateRecorded: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onDeleteRecording: PropTypes.func.isRequired,
    onSaveRecording: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
};

export default Recording;
