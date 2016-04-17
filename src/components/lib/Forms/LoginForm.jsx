import debug from 'debug';
import React, { PropTypes } from 'react';

import Input from 'components/lib/Input';
import Submit from 'components/lib/Submit';

import styles from './styles.css';

const log = debug('ap.LoginForm'); // eslint-disable-line no-unused-vars

const LoginForm = (props) => (
    <form className={styles.container} onSubmit={props.onSubmit}>
        <h1>Login</h1>

        <Input
            label="Username"
            placeholder="Enter Username"
            type="text"
            {...props.username}
        />

        <Input
            label="Password"
            placeholder="Enter Password"
            type="password"
            {...props.password}
        />

        <Submit />
    </form>
);


LoginForm.propTypes = {
    onSubmit: PropTypes.func,
    password: PropTypes.object,
    username: PropTypes.object,
};

export default LoginForm;
