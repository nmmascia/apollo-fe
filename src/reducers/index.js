import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as modal } from 'redux-modal';

import performances from './performances';
import poems from './poems';
import users from './users';

const rootReducer = combineReducers({
    form,
    modal,
    performances,
    poems,
    users,
});

export default rootReducer;
