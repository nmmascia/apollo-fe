import debug from 'debug';
import { CALL_API } from 'redux-api-middleware';

import { getAudioUrl } from 'utils/aws-s3-service';

const log = debug('ap.performances reducer'); // eslint-disable-line no-unused-vars

//

export const RECEIVE_PAST_PERFORMANCES = 'RECEIVE_PAST_PERFORMANCES';

export const GET_PERFORMANCE_AUDIO = 'GET_PERFORMANCE_AUDIO';

//

const initialState = {
    performancesById: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PAST_PERFORMANCES: {
            const { performances } = action.payload;

            const performancesById = performances.reduce((acc, cur) => {
                const perfs = acc;
                perfs[cur.id] = cur;
                return perfs;
            }, {});

            return {
                ...state,
                performancesById,
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

export const fetchPerformanceAudio = id => (dispatch, getState) => {
    const { performancesById } = getState().performances;
    const { key } = performancesById[id];

    getAudioUrl(key)
    .then(audio => log(audio))
    .catch(err => log(err));
};
