import debug from 'debug';
import { CALL_API } from 'redux-api-middleware';
import { browserHistory } from 'react-router';

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
            const { _id, token } = action.payload;
            return {
                ...state,
                currentUserId: _id,
                token,
            };
        }
        case LOGOUT_USER: {
            return {
                ...state,
                currentUserId: null,
            };
        }
        case RECEIVE_USER: {
            const user = action.payload;
            return {
                ...state,
                usersById: {
                    ...state.usersById,
                    [user._id]: {
                        ...user,
                        isLoading: false,
                    },
                },
            };
        }
        case REQUEST_USER: {
            const { _id } = action.payload;
            return {
                ...state,
                usersById: {
                    ...state.usersById,
                    [_id]: {
                        name: '',
                        isLoading: true,
                        profilePicture: null,
                        username: '',
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
    .then(response => browserHistory.push(`/profile/${response.payload.user._id}`));
};

export const fetchUser = _id => ({
    [CALL_API]: {
        endpoint: `http://localhost:8080/user/${_id}`,
        method: 'GET',
        types: [
            {
                type: REQUEST_USER,
                payload: () => ({ _id }),
            },
            RECEIVE_USER,
            'FAILURE',
        ],
        bailout: ({ users }) => Boolean(users.usersById[_id]),
    },
});
