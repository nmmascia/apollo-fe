import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Audio from 'components/lib/Audio';
import Thumbnail from 'components/lib/Thumbnail';

import styles from './Performance.css';

export default class Performance extends Component {
    static propTypes = {
        author: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        dateRecorded: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        showUserInfo: PropTypes.bool,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        userId: PropTypes.string,
        username: PropTypes.string,
    };

    renderUserInfo() {
        const {
            avatar,
            name,
            showUserInfo,
            userId,
            username,
        } = this.props;


        if (!showUserInfo) return null;

        const classes = {
            [styles.inlineList]: avatar,
        };

        const userInfo = (
            <ul className={classNames(styles.list, classes)}>
                <li><h1 className={styles.mainTitle}>{username}</h1></li>
                <li><h2 className={styles.secondaryTitle}>{name}</h2></li>
            </ul>
        );

        if (avatar) {
            return (
                <Link to={`/profile/${userId}`}>
                    <Thumbnail
                        height={40}
                        width={40}
                        url={avatar}
                    />
                    {userInfo}
                </Link>
            );
        } else {
            return userInfo;
        }
    }

    renderPoemInfo() {
        const {
            author,
            dateRecorded,
            title,
        } = this.props;

        return (
            <ul className={styles.list}>
                <li><h1 className={styles.mainTitle}>{title}</h1></li>
                <li><h2 className={styles.secondaryTitle}>{author}</h2></li>
                <li>{`Recorded: ${dateRecorded}`}</li>
            </ul>
        );
    }

    render() {
        const {
            url,
        } = this.props;

        return (
            <div className={styles.container}>
                {this.renderPoemInfo()}
                {this.renderUserInfo()}
                <Audio src={url} />
            </div>
        );
    }
}
