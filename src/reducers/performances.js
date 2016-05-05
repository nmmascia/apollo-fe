import debug from 'debug';
import { CALL_API } from 'redux-api-middleware';

const log = debug('ap.performances reducer'); // eslint-disable-line no-unused-vars

//

const RECEIVE_PAST_PERFORMANCES = 'RECEIVE_PAST_PERFORMANCES';

//

const initialState = {
    performancesByUserId: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PAST_PERFORMANCES: {
            const { payload } = action;
            return {
                ...state,
                performancesByUserId: {
                    [payload.userId]: [
                        ...payload.performances,
                    ],
                },
            };
        }
        default: {
            return state;
        }
    }
};

//

export const createPerformance = id => (dispatch, getState) => {
    const { users, recorder } = getState();
    const performance = recorder.recordingsById[id];
    const userId = users.currentUserId;
    const poemId = users.usersById[users.currentUserId].currentPoemId;

    const formData = new FormData();
    formData.append('performance', performance.blob, 'audio.wav');
    formData.append('userId', userId);
    formData.append('poemId', poemId);

    dispatch({
        [CALL_API]: {
            body: formData,
            endpoint: '//localhost:8080/performance/create',
            method: 'POST',
            types: [
                'REQUEST_CREATE_PERFORMANCE',
                'SUCCESS_CREATE_PERFORMANCE',
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
            'REQUEST_PAST_PERFORMANCES',
            RECEIVE_PAST_PERFORMANCES,
            'FAILURE_PAST_PERFORMANCES',
        ],
    },
});
