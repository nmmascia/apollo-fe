import { createSelector } from 'reselect';

const getRecorings = state => state.recorder.recordingsById;

export const convertRecordingsToArray = createSelector(
    getRecorings,
    recordings => {
        return Object.keys(recordings).reduce((acc, cur) => {
            const all = acc;
            all.push(recordings[cur]);
            return all;
        }, []);
    }
);
