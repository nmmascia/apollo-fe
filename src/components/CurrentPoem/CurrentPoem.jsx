import AudioRecorder from 'react-audio-recorder';
import debug from 'debug';
import React, { PropTypes } from 'react';

import PoemViewer from 'components/PoemViewer';

import styles from './CurrentPoem.css';

const log = debug('ap.CurrentPoem'); // eslint-disable-line no-unused-vars

const CurrentPoem = ({ author, lines, onAudioRecorded, title }) => {
    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <h1>Current Poem</h1>
            </header>
            <PoemViewer
                author={author}
                lines={lines}
                title={title}
            />
            <footer className={styles.footer}>
                <AudioRecorder
                    onChange={data => onAudioRecorded(data)}
                />
            </footer>
        </section>
    );
};

CurrentPoem.propTypes = {
    author: PropTypes.string.isRequired,
    lines: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAudioRecorded: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default CurrentPoem;
