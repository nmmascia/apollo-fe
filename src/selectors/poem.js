import debug from 'debug';
import { createSelector } from 'reselect';

import { getUserInfo } from 'selectors/user';

const log = debug('ap.poem selectors'); // eslint-disable-line no-unused-vars

export const getProfilePoem = createSelector(
    getUserInfo,
    state => state.poems.poemsById,
    (currentUser, poems) => {
        if (!currentUser.currentPoemId) {
            return {
                author: '',
                id: '',
                isLoading: true,
                lines: [],
                title: '',
            };
        }
        return poems[currentUser.currentPoemId];
    },
);
