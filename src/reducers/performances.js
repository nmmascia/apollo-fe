import debug from 'debug';
import { CALL_API } from 'redux-api-middleware';

import reduceToIdMap from 'utils/reduceToIdMap';

const log = debug('ap.performances reducer'); // eslint-disable-line no-unused-vars

//

export const SUCCESS_CREATE_PERFORMANCE = 'SUCCESS_CREATE_PERFORMANCE';

const REQUEST_PAST_PERFORMANCES = 'REQUEST_PAST_PERFORMANCES';
export const RECEIVE_PAST_PERFORMANCES = 'RECEIVE_PAST_PERFORMANCES';

export const GET_PERFORMANCE_AUDIO = 'GET_PERFORMANCE_AUDIO';

const RECEIVE_PERFORMANCE_FEED = 'RECEIVE_PERFORMANCE_FEED';

const RECEIVE_PERFORMANCES = 'RECEIVE_PERFORMANCES';

//

const initialState = {
    isLoadingPerformances: false,
    performancesById: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PERFORMANCES: {
            const { performances } = action.payload;
            const newPerformances = performances.reduce(reduceToIdMap, {});

            return {
                ...state,
                performancesById: {
                    ...newPerformances,
                    ...state.performancesById,
                },
            };
        }

        case REQUEST_PAST_PERFORMANCES: {
            return {
                ...state,
                isLoadingPerformances: true,
            };
        }
        case RECEIVE_PAST_PERFORMANCES: {
            const { performances } = action.payload;

            const performancesById = performances.reduce((acc, cur) => {
                const perfs = acc;
                perfs[cur.id] = cur;
                return perfs;
            }, {});

            return {
                ...state,
                isLoadingPerformances: false,
                performancesById,
            };
        }
        case SUCCESS_CREATE_PERFORMANCE: {
            const { performance } = action.payload;

            return {
                ...state,
                performancesById: {
                    ...state.performancesById,
                    [performance.id]: {
                        ...performance,
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

export const receivePerformances = performances => ({
    type: RECEIVE_PERFORMANCES,
    payload: {
        performances,
    },
    meta: undefined,
});

export const createPerformance = id => (dispatch, getState) => {
    const { users, recorder } = getState();
    const performance = recorder.recordingsById[id];
    const userId = users.currentUserId;
    const poemId = users.usersById[users.currentUserId].currentPoemId;

    const formData = new FormData();
    formData.append('performance', performance.blob, 'audio.wav');
    formData.append('userId', userId);
    formData.append('poemId', poemId);
    formData.append('dateRecorded', new Date().toISOString());

    return dispatch({
        [CALL_API]: {
            body: formData,
            endpoint: '//localhost:8080/performance/create',
            method: 'POST',
            types: [
                'REQUEST_CREATE_PERFORMANCE',
                SUCCESS_CREATE_PERFORMANCE,
                'FAILURE_CREATE_PERFORMANCE',
            ],
        },
    });
};

export const fetchPastPerformances = userId => ({
    [CALL_API]: {
        endpoint: `//localhost:8080/performance?userId=${userId}`,
        method: 'GET',
        types: [
            REQUEST_PAST_PERFORMANCES,
            RECEIVE_PAST_PERFORMANCES,
            'FAILURE_PAST_PERFORMANCES',
        ],
        bailout: ({ users }) => {
            // todo: improve bailout here because we might be
            // requesting more past performances once pagination
            // is enabled
            const bailout = Boolean(users.usersById[userId].performances.length);
            log(bailout);
            return bailout;
        },
    },
});

export const fetchPerformanceFeed = () => ({
    [CALL_API]: {
        endpoint: '//localhost:8080/performance/feed',
        method: 'GET',
        types: [
            'REQUEST_PERFORMANCE_FEED',
            RECEIVE_PERFORMANCE_FEED,
            'FAILURE_PAST_PERFORMANCES',
        ],
    },
});
