import { browserHistory } from 'react-router';

import { loginUser } from 'reducers/auth';

//

const GO_TO_USER_PROFILE = 'GO_TO_USER_PROFILE';

//

const goToUserProfile = userId => dispatch => {
    browserHistory.push(`/profile/${userId}`);
    dispatch({ type: GO_TO_USER_PROFILE, userId });
};

export const loginUserAndGoToProfile = credentials => async dispatch => {
    const action = await dispatch(loginUser(credentials));
    const userId = action.payload.user.id;
    dispatch(goToUserProfile(userId));
};
