import debug from 'debug';
import { createSelector } from 'reselect';

import { getUserInfo } from 'selectors/user';

const log = debug('ap.poem selectors');

export const getProfilePoem = createSelector(
    getUserInfo,
    state => state.poems.poemsById,
    (currentUser, poems) => {
        log(currentUser, poems);
        return poems[currentUser.currentPoemId] || {
            author: '',
            _id: '',
            isLoading: true,
            lines: [],
            title: '',
        };
    },
);
