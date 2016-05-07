import debug from 'debug';
import { CALL_API } from 'redux-api-middleware';
import { browserHistory } from 'react-router';

import { RECEIVE_PAST_PERFORMANCES } from 'reducers/performances';

const log = debug('ap.users.reducer'); // eslint-disable-line no-unused-vars

//

const REQUEST_USER = 'REQUEST_USER';
const RECEIVE_USER = 'RECEIVE_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const REQUEST_LOGIN = 'REQUEST_LOGIN';
const LOGIN_USER = 'LOGIN_USER';

//

const initialState = {
    currentUserId: '',
    userToken: '',
    usersById: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            const { user, code } = action.payload;
            return {
                ...state,
                currentUserId: user.id,
                userToken: code,
                usersById: {
                    [user.id]: {
                        ...user,
                    },
                },
            };
        }
        case LOGOUT_USER: {
            return {
                ...state,
                currentUserId: '',
                userToken: '',
                usersById: {
                    [state.currentUserId]: {

                    },
                },
            };
        }
        case RECEIVE_USER: {
            const user = action.payload;
            return {
                ...state,
                usersById: {
                    ...state.usersById,
                    [user.id]: {
                        ...user,
                        isLoading: false,
                    },
                },
            };
        }
        case REQUEST_USER: {
            const { id } = action.payload;
            return {
                ...state,
                usersById: {
                    ...state.usersById,
                    [id]: {
                        name: '',
                        isLoading: true,
                        profilePicture: null,
                        username: '',
                    },
                },
            };
        }
        case RECEIVE_PAST_PERFORMANCES: {
            const { performances, userId } = action.payload;
            return {
                ...state,
                usersById: {
                    ...state.usersById,
                    [userId]: {
                        ...state.usersById[userId],
                        performances: [
                            ...state.usersById[userId].performances,
                            ...performances.map(perf => perf.id),
                        ],
                    },
                },
            };
        }
        default: {
            return state;
        }
    }
};

//

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

export const loginUser = (username, password) => ({
    [CALL_API]: {
        endpoint: 'http://localhost:8080/user/auth',
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        types: [
            {
                type: REQUEST_LOGIN,
                payload: () => ({ username, password }),
            },
            LOGIN_USER,
            'FAILURE',
        ],
    },
});

export const loginUserAndNavigateToProfile = (username, password) => dispatch => {
    return dispatch(loginUser(username, password))
    .then(response => browserHistory.push(`/profile/${response.payload.user.id}`));
};

export const fetchUser = id => ({
    [CALL_API]: {
        endpoint: `http://localhost:8080/user/${id}`,
        method: 'GET',
        types: [
            {
                type: REQUEST_USER,
                payload: () => ({ id }),
            },
            RECEIVE_USER,
            'FAILURE',
        ],
        bailout: ({ users }) => Boolean(users.usersById[id]),
    },
});
