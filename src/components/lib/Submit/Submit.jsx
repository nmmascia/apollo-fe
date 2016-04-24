import React, { PropTypes } from 'react';

import styles from './Submit.css';

const Submit = ({ className, label }) => (
    <div className={styles.container}>
        <input
            className={className || styles.submit}
            type="submit"
            value={label || 'submit'}
        />
    </div>
);

Submit.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
};

export default Submit;
