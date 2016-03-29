import { createSelector } from 'reselect';
import debug from 'debug';

const log = debug('ap.users.reducer');

//

//

const initialState = {
    currentUserId: '56eb719c4c9ee0096dc379f5',
    usersById: [
        {
            birthdate: new Date(),
            _id: '1',
            name: 'Emily D.',
            profilePicture: require('components/Profile/images/profile-image.jpg'),
            username: 'egurl55',
            currentPoem: 1,
        },
        {
            birthdate: new Date(),
            _id: '2',
            name: 'Ralph Waldo E.',
            profilePicture: require('components/Profile/images/profile-image.jpg'),
            username: 'emmermoney',
            currentPoem: 1,
        },
        {
            birthdate: new Date(),
            _id: '3',
            name: 'Robert F.',
            profilePicture: require('components/Profile/images/profile-image.jpg'),
            username: 'mrchill',
            currentPoem: 1,
        },
        {
            birthdate: new Date('Mar 26 1988'),
            _id: '56eb719c4c9ee0096dc379f5',
            name: 'Nicholas M.',
            profilePicture: require('components/Profile/images/profile-image.jpg'),
            username: 'nmmascia',
            currentPoem: 1,
        },
    ],
};

export default (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};

//

//

const getCurrentUserId = state => state.users.currentUserId;
const getAllUsers = state => state.users.usersById;
const getUserIdFromParams = (state, props) => (
    props.params._id ? props.params._id : state.users.currentUserId
);
const findUserById = (_id, allUsers) => (
    allUsers.find(user => user._id === _id)
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
