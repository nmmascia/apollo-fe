import React, { Component, PropTypes } from 'react';

import PoemHeader from './PoemHeader';

import styles from './PoemViewer.css';

export default class PoemViewer extends Component {
    static propTypes = {
        author: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        lines: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    renderLines() {
        const { lines } = this.props;
        return (
            <ul>
                {lines.map((line, index) => <li key={index}>{line}</li>)}
            </ul>
        );
    }

    render() {
        const {
            author,
            title,
        } = this.props;

        return (
            <div className={styles.container}>
                <PoemHeader
                    author={author}
                    title={title}
                />
                {this.renderLines()}
            </div>
        );
    }
}
