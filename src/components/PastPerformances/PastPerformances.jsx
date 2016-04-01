import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import Audio from 'components/lib/Audio';
import PastPerformance from './PastPerformance';

import styles from './PastPerformances';

const log = debug('ap.PastPerformances'); // eslint-disable-line no-unused-vars

export default class PastPerformances extends Component {
    static propTypes = {
        performances: PropTypes.arrayOf(PropTypes.shape({
            author: PropTypes.string.isRequired,
            dateRecorded: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })),
    }

    render() {
        const performanceComponents = this.props.performances.map(perf => (
            <PastPerformance
                author={perf.author}
                dateRecorded={perf.dateRecorded}
                _id={perf._id}
                title={perf.title}
                url={perf.url}
            />
        ));

        return (
            <section className={styles.container}>
                {performanceComponents}
            </section>
        );
    }
}
