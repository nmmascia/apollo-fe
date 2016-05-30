import debug from 'debug';
import { CALL_API } from 'redux-api-middleware';

import reduceToIdMap from 'utils/reduceToIdMap';

const log = debug('ap.poems.reducer'); // eslint-disable-line no-unused-vars

//

const REQUEST_POEM = 'REQUEST_POEM';
const RECEIVE_POEMS = 'RECEIVE_POEMS';

//

const initialState = {
    poemsById: {},
};

export default (state = initialState, action) => {
    switch (action.type) {

        case RECEIVE_POEMS: {
            const { poems } = action.payload;
            const newPoems = poems.reduce(reduceToIdMap, {});

            return {
                ...state,
                poemsById: {
                    ...newPoems,
                    ...state.poemsById,
                },
            };
        }

        default: {
            return state;
        }
    }
};

//

export const receivePoems = poems => ({
    type: RECEIVE_POEMS,
    payload: {
        poems,
    },
    meta: undefined,
});

export const fetchPoem = id => dispatch => {
    const actionResponse = dispatch({
        [CALL_API]: {
            endpoint: `//localhost:8080/poem/${id}`,
            method: 'GET',
            types: [
                {
                    type: REQUEST_POEM,
                    payload: () => ({ id }),
                },
                'RECEIVE_POEM',
                'FAILURE',
            ],
            bailout: ({ poems }) => {
                const bailout = Boolean(poems.poemsById[id]);
                return bailout;
            },
        },
    });

    actionResponse
    .then(action => {
        const { poems } = action.payload;
        dispatch(receivePoems(poems));
    });
};

//
