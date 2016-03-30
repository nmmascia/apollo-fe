import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import AppHeader from 'components/AppHeader';

import {
    getCurrentUser,
    logoutUser,
} from 'reducers/users';

import './global.css';

@connect((state) => ({
    currentUser: getCurrentUser(state),
}))
export default class AppContainer extends Component {
    static propTypes = {
        children: PropTypes.any,
        currentUser: PropTypes.shape({
            _id: PropTypes.string,
            username: PropTypes.string,
        }),
        dispatch: PropTypes.func.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    render() {
        const {
            children,
            currentUser: {
                _id,
                username,
            },
            dispatch,
        } = this.props;

        const {
            router,
        } = this.context;

        return (
            <div>
                <AppHeader
                    goToLogin={() => router.push('/login')}
                    logoutUser={() => {
                        router.push('/');
                        dispatch(logoutUser());
                    }}
                    userId={_id}
                    username={username}
                />
                {children}
            </div>
        );
    }
}
