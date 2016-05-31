import debug from 'debug';
import { CALL_API } from 'redux-api-middleware';

import { receiveUsers } from 'reducers/users';

const log = debug('ap.auth reducer');
const reducerName = '@auth';

//

const LOGIN_USER = `${reducerName}/LOGIN_USER`;
const LOGOUT_USER = `${reducerName}/LOGOUT_USER`;

//

const initialState = {
    currentUserId: null,
    token: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            const { user, code } = action.payload;

            return {
                currentUserId: user.id,
                token: code,
            };
        }
        case LOGOUT_USER: {
            return {
                currentUserId: null,
                token: null,
            };
        }

        default: {
            return state;
        }
    }
};

//

export const loginUser = credentials => async dispatch => {
    const action = await dispatch({
        [CALL_API]: {
            endpoint: '//localhost:8080/user/auth',
            method: 'post',
            body: JSON.stringify(credentials),
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            types: [
                'REQUEST_LOGIN',
                LOGIN_USER,
                'FAILURE_LOGIN',
            ],
        },
    });

    const { user } = action.payload;
    dispatch(receiveUsers([user]));

    return action;
};

export const logoutUser = () => ({
    type: LOGOUT_USER,
});
