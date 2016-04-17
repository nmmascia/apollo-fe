import Button from 'react-button';
import debug from 'debug';
import { Link } from 'react-router';
import React, { Component, PropTypes } from 'react';

const log = debug('ap.AppHeader'); // eslint-disable-line no-unused-vars

import styles from './AppHeader.css';

export default class AppHeader extends Component {
    static propTypes = {
        goToLogin: PropTypes.func.isRequired,
        logoutUser: PropTypes.func.isRequired,
        userId: PropTypes.string,
        username: PropTypes.string,
    }

    renderProfileLink() {
        const { userId } = this.props;
        if (!userId) return null;

        return (
            <Link
                className={styles.anchorTag}
                to={`/profile/${userId}`}
            >
                Profile
            </Link>
        );
    }

    render() {
        const {
            goToLogin,
            logoutUser,
            userId,
            username,
        } = this.props;

        return (
            <header className={styles.container}>
                <ul className={styles.links}>
                    <li className={styles.logo}>-- apollo --</li>
                    <li>
                        {this.renderProfileLink()}
                        <Link className={styles.anchorTag} to="/feed">Feed</Link>
                    </li>
                </ul>

                <ul className={styles.links}>
                    <li>{username}</li>
                    <li>
                        <Button
                            onClick={userId ? logoutUser : goToLogin}
                        >
                            {userId ? 'Logout' : 'Login'}
                        </Button>
                    </li>
                </ul>
            </header>
        );
    }
}
