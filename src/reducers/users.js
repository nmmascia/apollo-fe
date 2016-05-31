import debug from 'debug';
import uniq from 'lodash.uniq';
import { CALL_API } from 'redux-api-middleware';

import { receivePoems } from 'reducers/poems';

import {
    RECEIVE_PAST_PERFORMANCES,
    SUCCESS_CREATE_PERFORMANCE,
} from 'reducers/performances';

import reduceToIdMap from 'utils/reduceToIdMap';

const log = debug('ap.users.reducer'); // eslint-disable-line no-unused-vars

//

const RECEIVE_USERS = 'RECEIVE_USERS';

const REQUEST_USER = 'REQUEST_USER';
const RECEIVE_USER = 'RECEIVE_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const REQUEST_LOGIN = 'REQUEST_LOGIN';
const LOGIN_USER = 'LOGIN_USER';

const REQUEST_NEXT_POEM = 'REQUEST_NEXT_POEM';
export const RECEIVE_NEXT_POEM = 'RECEIVE_NEXT_POEM';
const FAILURE_NEXT_POEM = 'FAILURE_NEXT_POEM';

//

const initialState = {
    currentUserId: '',
    userToken: '',
    usersById: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_USERS: {
            const { users } = action.payload;
            const newUsers = users.reduce(reduceToIdMap, {});

            return {
                ...state,
                usersById: {
                    ...newUsers,
                    ...state.usersById,
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
                        performances: [],
                        profilePicture: null,
                        username: '',
                    },
                },
            };
        }
        case RECEIVE_PAST_PERFORMANCES: {
            const { performances, userId } = action.payload;

            const allPerformances = uniq([
                ...state.usersById[userId].performances,
                ...performances.map(perf => perf.id),
            ]);

            return {
                ...state,
                usersById: {
                    ...state.usersById,
                    [userId]: {
                        ...state.usersById[userId],
                        performances: [
                            ...allPerformances,
                        ],
                    },
                },
            };
        }
        case SUCCESS_CREATE_PERFORMANCE: {
            const { performance, userId } = action.payload;
            return {
                ...state,
                usersById: {
                    ...state.usersById,
                    [userId]: {
                        ...state.usersById[userId],
                        performances: [
                            ...state.usersById[userId].performances,
                            performance.id,
                        ],
                    },
                },
            };
        }
        case RECEIVE_NEXT_POEM: {
            const { poem } = action.payload;
            return {
                ...state,
                usersById: {
                    ...state.usersById,
                    [state.currentUserId]: {
                        ...state.usersById[state.currentUserId],
                        currentPoemId: poem.id,
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

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    payload: {
        users,
    },
    meta: undefined,
});

export const fetchUser = id => ({
    [CALL_API]: {
        endpoint: `//localhost:8080/user/${id}`,
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

export const getNextCurrentPoemForUser = id => ({
    [CALL_API]: {
        endpoint: `//localhost:8080/user/${id}/next-poem`,
        method: 'PUT',
        types: [
            REQUEST_NEXT_POEM,
            RECEIVE_NEXT_POEM,
            FAILURE_NEXT_POEM,
        ],
    },
});

export const receiveUser = user => ({
    type: RECEIVE_USER,
    payload: user,
    meta: undefined,
});
