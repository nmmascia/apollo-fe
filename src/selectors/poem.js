import debug from 'debug';
import { createSelector } from 'reselect';

import { getUserInfo } from 'selectors/user';

const log = debug('ap.poem selectors'); // eslint-disable-line no-unused-vars

export const getAllPoems = state => state.poems.poemsById;

export const getProfilePoem = createSelector(
    getUserInfo,
    getAllPoems,
    (currentUser, poems) => {
        if (!poems[currentUser.currentPoemId]) {
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
