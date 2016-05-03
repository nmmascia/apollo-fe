import classNames from 'classnames';
import debug from 'debug';
import React, { PropTypes } from 'react';

import styles from './RecordButton.css';

const log = debug('ap.RecordButton'); // eslint-disable-line no-unused-vars

const RecordButton = ({ isRecording, onClick }) => {
    const classes = {
        [styles.recordButton]: true,
        [styles.isRecording]: isRecording,
    };

    return (
        <div className={classNames(classes)} onClick={onClick} />
    );
};

RecordButton.propTypes = {
    isRecording: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default RecordButton;
