import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import styles from './PastPerformances';

const log = debug('ap.PastPerformances'); // eslint-disable-line no-unused-vars

export default class PastPerformances extends Component {
    static propTypes = {
        performances: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            dateRecorded: PropTypes.string.isRequired,
        })),
    }

    render() {
        return (
            <section className={styles.container}>
                {JSON.stringify(this.props.performances, null, 2)}
            </section>
        );
    }
}
