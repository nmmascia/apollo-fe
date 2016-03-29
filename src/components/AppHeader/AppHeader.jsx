import Button from 'react-button';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

import styles from './AppHeader.css';

export default class AppHeader extends Component {
    static propTypes = {
        userId: PropTypes.string,
        username: PropTypes.string,
    }

    render() {
        const {
            userId,
            username,
        } = this.props;

        return (
            <header className={styles.container}>
                <ul className={styles.links}>
                    <li className={styles.logo}>-- apollo --</li>
                    <li>
                        <Link className={styles.anchorTag} to="/profile">Profile</Link>
                    </li>
                </ul>

                <ul className={styles.links}>
                    <li>{username}</li>
                    <li>
                        <Button>
                            {userId ? 'Login' : 'Logout'}
                        </Button>
                    </li>
                </ul>
            </header>
        );
    }
}
