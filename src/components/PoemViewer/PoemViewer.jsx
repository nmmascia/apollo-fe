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
        const elements = lines.map((line, index) => {
            if (line === '') return <br key={index} />;

            return (
                <li
                    className={styles.line}
                    key={index}
                >
                    {line}
                </li>
            );
        });

        return (
            <ol className={styles.list}>
                {elements}
            </ol>
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
