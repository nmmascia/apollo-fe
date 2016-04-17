import createLogger from 'redux-logger';

export const logger = createLogger({
    colors: {
        title: () => 'magenta',
        prevState: () => 'blue',
        action: () => 'magenta',
        nextState: () => 'blue',
        error: () => 'red',
    },
});
