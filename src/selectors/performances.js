import debug from 'debug';
import { createSelector } from 'reselect';

import { getUserInfo } from 'selectors/user';

const log = debug('ap.performances'); // eslint-disable-line no-unused-vars

const getAllPerformances = state => state.performances.performancesById;

export const getPastPerformancesForUser = createSelector(
    getAllPerformances,
    getUserInfo,
    (performances, user) => {
        const ids = Object.keys(performances);

        const pastPerformances = ids.map(id => {
            if (user.performances.includes(id)) {
                return performances[id];
            }

            return null;
        });

        return pastPerformances;
    }
);
