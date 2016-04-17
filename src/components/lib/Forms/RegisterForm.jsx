import React, { PropTypes } from 'react';

import Input from 'components/lib/Input';
import Submit from 'components/lib/Submit';

import styles from './styles.css';

const RegisterForm = (props) => (
    <form className={styles.container} onSubmit={props.onSubmit}>
        <h1>Register</h1>

        <Input
            label="Name"
            placeholder="Enter Name"
            type="text"
            {...props.name}
        />

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

RegisterForm.propTypes = {
    name: PropTypes.object,
    onSubmit: PropTypes.func,
    password: PropTypes.object,
    username: PropTypes.object,
};

export default RegisterForm;
