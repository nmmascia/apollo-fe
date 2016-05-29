import { createSelector } from 'reselect';

import { getAllPerformances } from 'selectors/performances';

const getPerformancesInFeed = state => state.feed.performancesInFeed;

export const getFeedPerformances = createSelector(
    getAllPerformances,
    getPerformancesInFeed,
    (performances, feedIds) => feedIds.map(id => performances[id])
);

