import debug from 'debug';

const log = debug('ap.user.reducer'); // eslint-disable-line no-unused-vars

//

const LOGIN_USER = 'LOGIN_USER';

//

const initialState = {
    username: 'nmmascia',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            return {
                ...state,
                username: action.username,
            };
        }
        default: {
            return state;
        }
    }
};

//

export const loginUser = username => ({
    username,
    type: LOGIN_USER,
});
