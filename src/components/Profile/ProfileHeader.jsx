import Button from 'react-button';
import classNames from 'classnames';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import styles from './ProfileHeader.css';

const log = debug('ap.ProfileHeader'); // eslint-disable-line no-unused-vars

export default class ProfileHeader extends Component {
    static propTypes = {
        name: PropTypes.string,
        onFollowUser: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
    };

    renderInfo() {
        const { name, username } = this.props;
        return (
            <div className={styles.section}>
                {name ? <span>{name}</span> : null}
                <br />
                <span>{username}</span>
            </div>
        );
    }

    render() {
        const {
            onFollowUser,
            username,
        } = this.props;

        return (
            <header className={styles.container}>
                {this.renderInfo()}
                <div className={styles.section}>
                    <Button onClick={() => onFollowUser(username)}>Follow</Button>
                </div>
            </header>
        );
    }
}
