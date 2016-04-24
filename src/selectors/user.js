import { createSelector } from 'reselect';

export const getCurrentUserId = state => state.users.currentUserId;
const getAllUsers = state => state.users.usersById;
export const getUserIdFromParams = (state, props) => props.params.id;
const findUserById = (id, allUsers) => {
    if (!allUsers[id]) {
        return {
            name: '',
            isLoading: true,
            profilePicture: null,
            username: '',
        };
    }

    return allUsers[id];
};

export const getCurrentUser = createSelector(
    getCurrentUserId,
    getAllUsers,
    findUserById,
);

export const getUserInfo = createSelector(
    getUserIdFromParams,
    getAllUsers,
    findUserById,
);

export const isCurrentUser = createSelector(
    getCurrentUserId,
    getUserIdFromParams,
    (currentUserId, paramsUserId) => currentUserId === paramsUserId,
);
