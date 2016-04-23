// Redux
import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

// Storage
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
import { mergeUser, userStorage } from './storage';

// Logging
import { logger } from 'utils/configureLogger';
import DevTools from 'utils/DevTools';
import { persistState as devToolsPersist } from 'redux-devtools';

// Reducers
import reducer from 'reducers';
const rootReducer = compose(
    mergePersistedState(mergeUser),
)(reducer);

const storage = compose(
    filter(['users']),
    userStorage,
)(adapter(window.localStorage));

const getDebugSessionKey = () => {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
};

const configureStore = (initialState) => {
    // This is a development configuration, all dev middlewares
    // should be disabled in prod
    const composedCreateStore = compose(
        persistState(storage, 'apollo'),
        applyMiddleware(apiMiddleware, thunk, logger),
        DevTools.instrument(),
        devToolsPersist(getDebugSessionKey()),
    )(createStore);

    const store = composedCreateStore(rootReducer, initialState);

    // if dev, enable hot module replacement for reducers here

    return store;
};

export default configureStore;
