import React, { PropTypes } from 'react';

import styles from './PoemHeader.css';

const PoemHeader = ({ author, title }) => (
    <header className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.author}>{author}</div>
    </header>
);

PoemHeader.propTypes = {
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default PoemHeader;
