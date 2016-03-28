import debug from 'debug';

const log = debug('ap.user.reducer'); // eslint-disable-line no-unused-vars

//

const LOGIN_USER = 'LOGIN_USER';

//

const initialState = {
    birthdate: new Date('Mar 26 1988'),
    _id: '56eb719c4c9ee0096dc379f5',
    name: 'Nicholas M.',
    username: 'nmmascia',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            return {
                ...state,
                birthday: action.birthdate,
                _id: action._id,
                name: action.name,
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
