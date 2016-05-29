import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import Performance from 'components/lib/Performance';

import styles from './Feed.css';

const log = debug('ap.Feed'); // eslint-disable-line no-unused-vars

export default class Feed extends Component {
    static propTypes = {
        poems: PropTypes.object,
        performances: PropTypes.array,
        users: PropTypes.object,
    };

    render() {
        const { performances, poems, users } = this.props;

        const components = performances.map(perf => {
            const poem = poems[perf.poemId];
            const user = users[perf.userId];

            return (
                <li key={perf.id}>
                    <Performance
                        author={poem.author}
                        avatar={user.avatar}
                        dateRecorded={perf.dateRecorded}
                        id={perf.id}
                        name={user.name}
                        showUserInfo={true}
                        title={poem.title}
                        url={perf.url}
                        userId={user.id}
                        username={user.username}
                    />
                </li>
            );
        });

        return (
            <ul className={styles.container}>
                {components}
            </ul>
        );
    }
}
