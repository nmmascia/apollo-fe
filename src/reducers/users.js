import { createSelector } from 'reselect';
import debug from 'debug';

const log = debug('ap.users.reducer'); // eslint-disable-line no-unused-vars

//

const LOGOUT_USER = 'LOGOUT_USER';
const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID';

//

const initialState = {
    currentUserId: '56eb719c4c9ee0096dc379f5',
    usersById: {
        1: {
            birthdate: new Date(),
            _id: '1',
            name: 'Emily D.',
            profilePicture: require('components/Profile/images/profile-image.jpg'),
            username: 'egurl55',
            currentPoem: '56f5cf810647d37a244bc325',
        },
        '56eb719c4c9ee0096dc379f5': {
            birthdate: new Date('Mar 26 1988'),
            _id: '56eb719c4c9ee0096dc379f5',
            name: 'Nicholas M.',
            profilePicture: require('components/Profile/images/profile-image.jpg'),
            username: 'nmmascia',
            currentPoemId: '56f5cf830647d37a244bca66',
        },
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_USER: {
            return {
                ...state,
                currentUserId: null,
            };
        }
        case SET_CURRENT_USER_ID: {
            const { currentUserId } = action;
            return {
                ...state,
                currentUserId,
            };
        }
        default: {
            return state;
        }
    }
};

//

const setCurrentUser = currentUserId => ({
    currentUserId,
    type: SET_CURRENT_USER_ID,
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

export const loginUser = () => dispatch => {
    dispatch(setCurrentUser('1'));
};

//

const getCurrentUserId = state => state.users.currentUserId;
const getAllUsers = state => state.users.usersById;
const getUserIdFromParams = (state, props) => props.params._id;

const findUserById = (_id, allUsers) => (
    allUsers[_id] || {}
);

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
