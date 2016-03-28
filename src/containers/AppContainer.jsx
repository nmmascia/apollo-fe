import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import AppHeader from 'components/AppHeader';

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
    userId: state.user._id,
    username: state.user.username,
});

export default connect(mapStateToProps)(AppContainer);
