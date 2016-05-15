import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import Performance from 'components/lib/Performance';

import styles from './PastPerformances';

const log = debug('ap.PastPerformances'); // eslint-disable-line no-unused-vars

export default class PastPerformances extends Component {
    static propTypes = {
        isLoadingPastPerformances: PropTypes.bool.isRequired,
        performances: PropTypes.arrayOf(PropTypes.shape({
            author: PropTypes.string.isRequired,
            dateRecorded: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })),
    }

    render() {
        const {
            isLoadingPastPerformances,
            performances,
        } = this.props;

        if (isLoadingPastPerformances) {
            return (
                <section className={styles.container}>
                    Loading...
                </section>
            );
        }

        if (performances.length === 0) {
            return (
                <section className={styles.container}>
                    You have no performances!
                    Try recording one!
                </section>
            );
        }

        const performanceComponents = this.props.performances.map((perf, index) => (
            <Performance
                author={perf.author}
                dateRecorded={perf.dateRecorded}
                id={perf.id}
                key={index}
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
