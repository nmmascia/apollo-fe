import debug from 'debug';
import { CALL_API } from 'redux-api-middleware';

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
        default: {
            return state;
        }
    }
};

//

export const fetchPoem = id => ({
    [CALL_API]: {
        endpoint: `http://localhost:8080/poem/${id}`,
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
