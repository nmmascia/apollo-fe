import debug from 'debug';
import { browserHistory } from 'react-router';

import {
    fetchUser,
    getNextCurrentPoemForUser,
} from 'reducers/users';

import { fetchPoem } from 'reducers/poems';

import {
    createPerformance,
    fetchPastPerformances,
} from 'reducers/performances';

const log = debug('ap.actions'); // eslint-disable-line no-unused-vars

export const getUserProfile = userId => async (dispatch, getState) => {
    await dispatch(fetchUser(userId));

    const { usersById } = getState().users;
    const user = usersById[userId];
    const { currentPoemId } = user;

    dispatch(fetchPoem(currentPoemId));
    dispatch(fetchPastPerformances(user.id));
};

export const getNextProfileState = recordingId => async (dispatch, getState) => {
    const response = await dispatch(createPerformance(recordingId));

    if (response.type.includes('SUCCESS')) {
        const userId = getState().users.currentUserId;
        dispatch(getNextCurrentPoemForUser(userId));
    }
};
