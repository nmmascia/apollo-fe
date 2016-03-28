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
            <header>
                <ul className={styles.links}>
                    <li>apollo</li>
                    <li>
                        <Link to="/profile" />
                    </li>
                </ul>

                <div className={styles.login}>
                    <Button>
                        {userId ? 'Login' : 'Logout'}
                    </Button>
                </div>
            </header>
        );
    }
}
