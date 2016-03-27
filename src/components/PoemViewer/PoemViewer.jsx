import React, { Component, PropTypes } from 'react';

export default class PoemViewer extends Component {
    static propTypes = {
        author: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        lines: PropTypes.arrayOf(PropTypes.string).isRequired,
    }

    renderLines() {
        const { lines } = this.props;
        return (
            <ul>
                {lines.map(line => <li key={line}>{line}</li>)}
            </ul>
        );
    }

    render() {
        const {
            author,
            title,
        } = this.props;

        return (
            <div>
                <header>
                    <span>{title}</span>
                    <span>{author}</span>
                </header>
                {this.renderLines()}
            </div>
        );
    }
}
