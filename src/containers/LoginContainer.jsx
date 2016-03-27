import debug from 'debug';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

const log = debug('ap.LoginContainer'); // eslint-disable-line no-unused-vars

@reduxForm({
    fields: ['username', 'password'],
    form: 'login',
})
export default class LoginContainer extends Component { // eslint-disable-line
    static propTypes = {
        fields: PropTypes.shape({
            username: PropTypes.object.isRequired,
            password: PropTypes.object.isRequired,
        }),
        onLoginSubmit: PropTypes.func.isRequired,
    };

    static defaultProps = {
        onLoginSubmit(e) {
            e.preventDefault();
        },
    }

    render() {
        const {
            fields: {
                username,
                password,
            },
            onLoginSubmit,
        } = this.props;

        return (
            <form onSubmit={onLoginSubmit}>
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
