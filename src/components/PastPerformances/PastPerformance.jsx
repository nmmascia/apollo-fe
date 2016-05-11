import React, { PropTypes } from 'react';

import Audio from 'components/lib/Audio';

import styles from './PastPerformance.css';

const PastPerformance = ({ author, dateRecorded, title, url }) => (
    <div className={styles.container}>
        <ul className={styles.list}>
            <li><h1 className={styles.title}>{title}</h1></li>
            <li><h3 className={styles.author}>{author}</h3></li>
            <li>{`Recorded: ${dateRecorded}`}</li>
        </ul>
        <Audio src={url} />
    </div>
);

PastPerformance.propTypes = {
    author: PropTypes.string.isRequired,
    dateRecorded: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default PastPerformance;
