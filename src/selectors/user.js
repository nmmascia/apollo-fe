import { createSelector } from 'reselect';

const getCurrentUserId = state => state.users.currentUserId;
const getAllUsers = state => state.users.usersById;
const getUserIdFromParams = (state, props) => props.params._id;
const findUserById = (_id, allUsers) => allUsers[_id] || {};

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
