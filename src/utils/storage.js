import { mergePersistedState } from 'redux-localstorage';

const noop = () => ({});

export const userStorage = storage => {
    return {
        ...storage,
        put: (key, state, callback = noop) => {
            const {
                users: {
                    currentUserId,
                    usersById,
                    userToken,
                }
            } = state;

            if (usersById[currentUserId]) {
                storage.put(key, {
                    userToken,
                    userInfo: usersById[currentUserId],
                }, callback);
            }
        },
    };
};

export const mergeUser = (initial, persisted) => ({
    ...initial,
    users: {
        currentUserId: persisted.userInfo._id,
        userToken: persisted.userToken,
        usersById: {
            [persisted.userInfo._id]: {
                ...persisted.userInfo,
            },
        },
    },
});
