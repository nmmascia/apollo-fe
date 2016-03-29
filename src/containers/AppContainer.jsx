import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import AppHeader from 'components/AppHeader';

import { getCurrentUser } from 'reducers/users';

import './global.css';

const AppContainer = ({ children, userId, username }) => (
    <div>
        <AppHeader
            userId={userId}
            username={username}
        />
        {children}
    </div>
);

AppContainer.propTypes = {
    children: PropTypes.any,
    userId: PropTypes.string,
    username: PropTypes.string,
};

const mapStateToProps = state => ({
    userId: getCurrentUser(state)._id,
    username: getCurrentUser(state).username,
});

export default connect(mapStateToProps)(AppContainer);
