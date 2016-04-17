import { connect } from 'react-redux';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';

const log = debug('ap.FeedContainer'); // eslint-disable-line no-unused-vars

@connect(() => ({}))
export default class FeedContainer extends Component {
    render() {
        return (
            <div>
                THIS IS THE FEED CONTAINER
            </div>
        );
    }
}
