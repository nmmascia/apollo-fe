// Redux
import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

// Logging
import { logger } from 'utils/configureLogger';
import DevTools from 'utils/DevTools';
import { persistState } from 'redux-devtools';

// Reducers
import rootReducer from 'reducers';

function getDebugSessionKey() {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
}

const configureStore = (initialState) => {
    // This is a development configuration, all dev middlewares
    // should be disabled in prod
    const composedCreateStore = compose(
        applyMiddleware(apiMiddleware, thunk, logger),
        DevTools.instrument(),
        persistState(getDebugSessionKey())
    )(createStore);

    const store = composedCreateStore(rootReducer, initialState);

    // if dev, enable hot module replacement for reducers here

    return store;
};

export default configureStore;
