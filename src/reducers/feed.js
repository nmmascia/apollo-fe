import debug from 'debug';
import { CALL_API } from 'redux-api-middleware';

import { receivePerformances } from 'reducers/performances';
import { receivePoems } from 'reducers/poems';
import { receiveUsers } from 'reducers/users';

const log = debug('ap.feed'); // eslint-disable-line no-unused-vars

//

const RECEIVE_FEED_PERFORMANCES = 'RECEIVE_FEED_PERFORMANCES';

//

const initialState = {
    performancesInFeed: [],
    totalItems: 0,
    cursor: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_FEED_PERFORMANCES: {
            const { performances } = action.payload;
            const performancesInFeed = performances.map(perf => perf.id);

            return {
                performancesInFeed,
                totalItems: action.payload.performances.length,
                cursor: null,
            };
        }
        default: {
            return state;
        }
    }
};

//

export const fetchFeed = () => (dispatch, getState) => {
    const { currentUserId } = getState().users;
    const url = '//localhost:8080/performance/feed';
    const query = currentUserId ? `?userId=${currentUserId}` : '';


    const actionResponse = dispatch({
        [CALL_API]: {
            endpoint: `${url}/${query}`,
            method: 'GET',
            types: [
                'REQUEST_FEED_PERFORMANCES',
                RECEIVE_FEED_PERFORMANCES,
                'FAILURE_FEED_PERFORMANCES',
            ],
        },
    });

    actionResponse
    .then(action => {
        const { users, performances, poems } = action.payload;
        dispatch(receiveUsers(users));
        dispatch(receivePoems(poems));
        dispatch(receivePerformances(performances));
    });
};
