// Redux
import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';

// Logging
import createLogger from 'redux-logger';
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
        applyMiddleware(createLogger()),
        DevTools.instrument(),
        persistState(getDebugSessionKey())
    )(createStore);

    const store = composedCreateStore(rootReducer, initialState);

    // if dev, enable hot module replacement for reducers here

    return store;
};

export default configureStore;
