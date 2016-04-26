import debug from 'debug';
import getUserMedia from 'getusermedia';

import {
    createRecorder,
    start,
    stop,
    getAudioUrl,
} from 'utils/recorder-utils';

const log = debug('ap.audio recorder'); // eslint-disable-line no-unused-vars

//

const GET_USER_MEDIA = 'GET_USER_MEDIA';
const GET_USER_MEDIA_ERROR = 'GET_USER_MEDIA_ERROR';
const GET_USER_MEDIA_SUCCESS = 'GET_USER_MEDIA_SUCCESS';

const START_RECORDING = 'START_RECORDING';
const STOP_RECORDING = 'STOP_RECORDING';

//

const initialState = {
    isRecording: false,
    recordings: [],
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
            return {
                ...state,
                isRecording: false,
                recordings: [
                    ...state.recordings,
                    action.recording,
                ],
            };
        }
        default: {
            return state;
        }
    }
};

//

export const requestMedia = () => dispatch => {
    dispatch({ type: GET_USER_MEDIA });

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
    const url = getAudioUrl();
    return { type: STOP_RECORDING, recording: url };
};
