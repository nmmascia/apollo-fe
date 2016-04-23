import { browserHistory } from 'react-router';

const GO_TO_USER_PROFILE = 'GO_TO_USER_PROFILE';

export const goToUserProfile = user => dispatch => {
    browserHistory.push(`/profile/${user}`);
    dispatch({ type: GO_TO_USER_PROFILE, user });
};
