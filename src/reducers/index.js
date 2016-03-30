import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import poems from './poems';
import users from './users';

const rootReducer = combineReducers({
    form,
    poems,
    users,
});

export default rootReducer;
