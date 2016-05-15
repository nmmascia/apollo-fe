import React, { Component, PropTypes } from 'react';

import Audio from 'components/lib/Audio';

import styles from './Performance.css';

export default class Performance extends Component {
    static propTypes = {
        author: PropTypes.string.isRequired,
        dateRecorded: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        showUserInfo: PropTypes.bool,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        username: PropTypes.string,
    };

    renderUserInfo() {
        const {
            name,
            showUserInfo,
            username,
        } = this.props;


        if (!showUserInfo) return null;

        return (
            <ul className={styles.list}>
                <li><h1 className={styles.mainTitle}>{username}</h1></li>
                <li><h2 className={styles.secondaryTitle}>{name}</h2></li>
            </ul>
        );
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
