import React, { PropTypes } from 'react';

import styles from './Input.css';

const Input = (props) => (
    <div className={props.className || styles.container}>
        <label htmlFor={props.label}>{props.label}</label>
        <input
            id={props.label}
            type={props.type}
            placeholder={props.placeholder}
            {...props}
        />
    </div>
);

Input.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
};

export default Input;
