import debug from 'debug';
import { createSelector } from 'reselect';

import { getUserInfo } from 'selectors/user';
import { getAllPoems } from 'selectors/poem';

const log = debug('ap.performances'); // eslint-disable-line no-unused-vars

const getAllPerformances = state => state.performances.performancesById;

export const getPastPerformancesForUser = createSelector(
    getAllPerformances,
    getUserInfo,
    getAllPoems,
    (performancesById, user, poemsById) => {
        const pastPerformances = user.performances.map(id => {
            let performance = performancesById[id];

            if (performance !== undefined) {
                const { author, title } = poemsById[performance.poemId];
                performance.author = author || '';
                performance.title = title || '';
            } else {
                performance = {
                    id: '',
                    dateRecorded: '',
                    author: '',
                    title: '',
                    url: '',
                };
            }

            return performance;
        });

        return pastPerformances;
    }
);
