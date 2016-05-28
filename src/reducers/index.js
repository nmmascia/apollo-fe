import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as modal } from 'redux-modal';

import carousel from './carousel';
import feed from './feed';
import performances from './performances';
import poems from './poems';
import recorder from './recorder';
import users from './users';

const rootReducer = combineReducers({
    carousel,
    form,
    feed,
    modal,
    performances,
    poems,
    recorder,
    users,
});

export default rootReducer;
