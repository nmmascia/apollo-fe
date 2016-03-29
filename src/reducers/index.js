import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import users from './users';

const rootReducer = combineReducers({
    form,
    users,
});

export default rootReducer;
