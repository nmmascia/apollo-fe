import debug from 'debug';
import { browserHistory } from 'react-router';

import { fetchUser } from 'reducers/users';
import { fetchPoem } from 'reducers/poems';
import { fetchPastPerformances } from 'reducers/performances';

const log = debug('ap.actions'); // eslint-disable-line no-unused-vars

const GO_TO_USER_PROFILE = 'GO_TO_USER_PROFILE';

export const goToUserProfile = user => dispatch => {
    browserHistory.push(`/profile/${user}`);
    dispatch({ type: GO_TO_USER_PROFILE, user });
};

export const getUserProfile = userId => (dispatch, getState) => {
    dispatch(fetchUser(userId))
    .then(() => {
        const { usersById } = getState().users;
        const user = usersById[userId];
        const { currentPoemId } = user;

        dispatch(fetchPoem(currentPoemId));
        dispatch(fetchPastPerformances(user.id));
    });
};
