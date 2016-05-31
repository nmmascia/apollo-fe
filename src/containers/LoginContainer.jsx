import debug from 'debug';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import { loginUserAndGoToProfile } from 'actions/navigation';

import LoginForm from 'components/lib/Forms/LoginForm';

const log = debug('ap.LoginContainer'); // eslint-disable-line no-unused-vars

@reduxForm({
    form: 'login',
    fields: ['password', 'username'],
})
export default class LoginContainer extends Component { // eslint-disable-line
    static propTypes = {
        className: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
        fields: PropTypes.object,
    };

    handleSubmit(e) {
        e.preventDefault();

        const {
            dispatch,
            fields: {
                username,
                password,
            },
        } = this.props;

        dispatch(loginUserAndGoToProfile({
            username: username.value,
            password: password.value,
        }));
    }

    render() {
        const {
            fields: {
                password,
                username,
            },
        } = this.props;

        return (
            <LoginForm
                onSubmit={::this.handleSubmit}
                password={password}
                username={username}
            />
        );
    }
}
