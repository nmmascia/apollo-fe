import debug from 'debug';
import shortid from 'shortid';
import { CALL_API } from 'redux-api-middleware';

import {
    createRecorder,
    getAudioBlob,
    getAudioUrl,
    start,
    stop,
} from 'utils/recorder-utils';

const log = debug('ap.audio recorder'); // eslint-disable-line no-unused-vars

//

const GET_USER_MEDIA_REQUEST = 'GET_USER_MEDIA_REQUEST';
const GET_USER_MEDIA_ERROR = 'GET_USER_MEDIA_ERROR';
const GET_USER_MEDIA_SUCCESS = 'GET_USER_MEDIA_SUCCESS';

const START_RECORDING = 'START_RECORDING';
const STOP_RECORDING = 'STOP_RECORDING';

const START_TICKING = 'START_TICKING';
const STOP_TICKING = 'STOP_TICKING';
const TICK = 'TICK';


export const DELETE_RECORDING = 'DELETE_RECORDING';

//

const initialState = {
    isConnected: false,
    isRecording: false,
    isRequested: false,
    recordingsById: {},
    intervalId: null,
    recordingDuration: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case START_RECORDING: {
            return {
                ...state,
                isRecording: true,
            };
        }
        case STOP_RECORDING: {
            const recording = action.payload;

            return {
                ...state,
                isRecording: false,
                recordingsById: {
                    ...state.recordingsById,
                    [recording.id]: {
                        ...recording,
                        duration: state.recordingDuration,
                    },
                },
                recordingDuration: 0,
            };
        }
        case DELETE_RECORDING: {
            const { id } = action.payload;
            const { recordingsById } = state;
            delete recordingsById[id];

            return {
                ...state,
                recordingsById: {
                    ...recordingsById,
                },
            };
        }
        case GET_USER_MEDIA_REQUEST: {
            return {
                ...state,
                isRequested: true,
            };
        }
        case GET_USER_MEDIA_SUCCESS: {
            return {
                ...state,
                isConnected: true,
                isRequested: false,
            };
        }
        case START_TICKING: {
            const { intervalId } = action.payload;

            return {
                ...state,
                intervalId,
            };
        }
        case STOP_TICKING: {
            return {
                ...state,
                intervalId: null,
            };
        }
        case TICK: {
            return {
                ...state,
                recordingDuration: state.recordingDuration + 1,
            };
        }
        default: {
            return state;
        }
    }
};

//

export const requestMedia = () => (dispatch, getState) => {
    const { isConnected, isRequested } = getState().recorder;
    if (isConnected || isRequested) return;

    dispatch({ type: GET_USER_MEDIA_REQUEST });

    createRecorder()
    .then(() => dispatch({ type: GET_USER_MEDIA_SUCCESS }))
    .catch(err => dispatch({ type: GET_USER_MEDIA_ERROR, payload: err, error: true }));
};

export const startRecording = () => {
    start();
    return { type: START_RECORDING };
};

export const stopRecording = () => {
    stop();

    const blob = getAudioBlob();
    const src = getAudioUrl();
    const id = shortid();
    const dateRecorded = new Date();

    log('Blob!', blob);

    return {
        type: STOP_RECORDING,
        payload: {
            id,
            blob,
            dateRecorded,
            src,
        },
    };
};

export const deleteRecording = id => {
    return {
        type: DELETE_RECORDING,
        payload: {
            id,
        },
    };
};

const tick = () => ({ type: TICK });

export const startTicking = () => dispatch => {
    const intervalId = setInterval(() => dispatch(tick()), 1000);
    dispatch({ type: START_TICKING, payload: { intervalId } });
};

export const stopTicking = () => (dispatch, getState) => {
    const { intervalId } = getState().recorder;
    clearInterval(intervalId);
    dispatch({ type: STOP_TICKING });
};
