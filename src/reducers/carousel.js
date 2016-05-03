import debug from 'debug';

import { DELETE_RECORDING } from './recorder';

const log = debug('ap.performances reducer'); // eslint-disable-line no-unused-vars

//

const UPDATE_CURRENT = 'UPDATE_CURRENT';

//

const initialState = {
    current: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_RECORDING: {
            const current = Math.max(state.current - 1, 0);

            return {
                ...state,
                current,
            };
        }
        case UPDATE_CURRENT: {
            const { value } = action.payload;

            return {
                ...state,
                current: state.current + value,
            };
        }
        default: {
            return state;
        }
    }
};

//

export const updateCurrent = value => ({
    type: UPDATE_CURRENT,
    payload: {
        value,
    },
});
