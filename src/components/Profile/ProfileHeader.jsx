import Button from 'react-button';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';

import Thumbnail from 'components/lib/Thumbnail';

import styles from './ProfileHeader.css';

const log = debug('ap.ProfileHeader'); // eslint-disable-line no-unused-vars

export default class ProfileHeader extends Component {
    static propTypes = {
        isCurrentUser: PropTypes.bool.isRequired,
        name: PropTypes.string,
        profilePicture: PropTypes.string,
        onFollowUser: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
    };

    renderInfo() {
        const {
            name,
            profilePicture,
            username,
        } = this.props;

        const userInfo = name ? ([
            <h1 key={name}>{name}</h1>,
            <h3 key={username}>{username}</h3>,
        ]) : <h1>{username}</h1>;

        return (
            <div className={styles.section}>
                <Thumbnail
                    height={150}
                    url={profilePicture}
                    width={150}
                />
                <div className={styles.userInfo}>
                    {userInfo}
                </div>
            </div>
        );
    }

    renderFollowButton() {
        const {
            isCurrentUser,
            onFollowUser,
            username,
        } = this.props;

        return !isCurrentUser ? (
            <Button onClick={() => onFollowUser(username)}>
                Follow
            </Button>
        ) : null;
    }

    render() {
        return (
            <header className={styles.container}>
                {this.renderInfo()}
                <div className={styles.section}>
                    {this.renderFollowButton()}
                </div>
            </header>
        );
    }
}
