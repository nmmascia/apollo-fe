import { connect } from 'react-redux';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';

const log = debug('ap.HomeContainer'); // eslint-disable-line no-unused-vars

export default class HomeContainer extends Component {
    componentWillMount() {
        log('HomeContainer will mount');
    }

    render() {
        return (
            <div>
                Hay
            </div>
        );
    }
}
