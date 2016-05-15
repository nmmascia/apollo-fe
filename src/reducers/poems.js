import debug from 'debug';
import { CALL_API } from 'redux-api-middleware';

import {
    RECEIVE_PAST_PERFORMANCES,
} from 'reducers/performances';

import {
    RECEIVE_NEXT_POEM,
} from 'reducers/users';

const log = debug('ap.poems.reducer'); // eslint-disable-line no-unused-vars

//

const REQUEST_POEM = 'REQUEST_POEM';
const RECEIVE_POEM = 'RECEIVE_POEM';

//

const initialState = {
    poemsById: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_NEXT_POEM: {
            const poem = action.payload;
            return {
                ...state,
                poemsById: {
                    ...state.poemsById,
                    [poem.id]: {
                        ...poem,
                        isLoading: false,
                    },
                },
            };
        }
        case RECEIVE_POEM: {
            const poem = action.payload;
            return {
                ...state,
                poemsById: {
                    ...state.poemsById,
                    [poem.id]: {
                        ...poem,
                        isLoading: false,
                    },
                },
            };
        }
        case REQUEST_POEM: {
            const { id } = action.payload;
            return {
                ...state,
                poemsById: {
                    ...state.poemsById,
                    [id]: {
                        author: '',
                        id,
                        isLoading: true,
                        lines: [],
                        title: '',
                    },
                },
            };
        }
        case RECEIVE_PAST_PERFORMANCES: {
            const { poems } = action.payload;
            const poemsById = poems.reduce((acc, curr) => {
                const all = acc;
                all[curr.id] = curr;
                return all;
            }, {});

            return {
                ...state,
                poemsById: {
                    ...state.poemsById,
                    ...poemsById,
                },
            };
        }
        default: {
            return state;
        }
    }
};

//

export const fetchPoem = id => ({
    [CALL_API]: {
        endpoint: `//localhost:8080/poem/${id}`,
        method: 'GET',
        types: [
            {
                type: REQUEST_POEM,
                payload: () => ({ id }),
            },
            RECEIVE_POEM,
            'FAILURE',
        ],
        bailout: ({ poems }) => {
            const bailout = Boolean(poems.poemsById[id]);
            log(bailout);
            return bailout;
        },
    },
});

//
