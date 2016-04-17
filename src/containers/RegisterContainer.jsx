import { connect } from 'react-redux';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import RegisterForm from 'components/lib/Forms/RegisterForm';

const log = debug('ap.RegisterContainer'); // eslint-disable-line no-unused-vars

@reduxForm({
    form: 'register',
    fields: ['name', 'password', 'username'],
})
@connect(() => ({}))
export default class RegisterContainer extends Component { // eslint-disable-line
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        fields: PropTypes.object,
    };

    handleSubmit(e) {
        e.preventDefault();
        const {
            dispatch,
            fields: {
                name,
                password,
                username,
            },
        } = this.props;

        log(name.value, password.value, username.value);
        dispatch({
            type: 'PLACEHOLDER_REGISTER',
            payload: {
                name,
                password,
                username,
            },
        });
    }

    render() {
        const {
            fields: {
                name,
                password,
                username,
            },
        } = this.props;

        return (
            <RegisterForm
                name={name}
                onSubmit={::this.handleSubmit}
                password={password}
                username={username}
            />
        );
    }
}

// This may get removed if using login/signup combo modal.
// export default connect(() => ({}))(RegisterContainer);
