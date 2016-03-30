import { connect } from 'react-redux';
import debug from 'debug';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import { loginUser } from 'reducers/users';

const log = debug('ap.LoginContainer'); // eslint-disable-line no-unused-vars

@reduxForm({
    fields: ['username', 'password'],
    form: 'login',
})
class LoginContainer extends Component { // eslint-disable-line
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        fields: PropTypes.shape({
            username: PropTypes.object.isRequired,
            password: PropTypes.object.isRequired,
        }),
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

        dispatch(loginUser(username.value, password.value));
    }

    render() {
        const {
            fields: {
                username,
                password,
            },
        } = this.props;

        return (
            <form onSubmit={::this.handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" placeholder="Enter Username" {...username} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Enter Password" {...password} />
                </div>
                <input type="submit" />
            </form>
        );
    }
}

// This may get removed if using login/signup combo modal.
export default connect()(LoginContainer);
