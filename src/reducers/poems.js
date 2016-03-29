import { createSelector } from 'reselect';
import debug from 'debug';

const log = debug('ap.poems.reducer'); // eslint-disable-line no-unused-vars

//

//

const initialState = {
    poemsById: [
        {
            _id: 1,
            title: 'Tho\' I get home how late -- how late',
            author: 'Emily Dickinson',
            lines: [
                'Tho\' I get home how late -- how late --',
                'So I get home - \'twill compensate --',
                'Better will be the Ecstasy',
                'That they have done expecting me --',
                'When Night -- descending -- dumb -- and dark --',
                'They hear my unexpected knock --',
                'Transporting must the moment be --',
                'Brewed from decades of Agony!',
                '',
                'To think just how the fire will burn --',
                'Just how long-cheated eyes will turn --',
                'To wonder what myself will say,',
                'And what itself, will say to me --',
                'Beguiles the Centuries of way!',
            ],
        },
        {
            _id: 2,
            title: 'Tho\' I get home how late -- how late',
            author: 'Emily Dickinson',
            lines: [
                'Tho\' I get home how late -- how late --',
                'So I get home - \'twill compensate --',
                'Better will be the Ecstasy',
                'That they have done expecting me --',
                'When Night -- descending -- dumb -- and dark --',
                'They hear my unexpected knock --',
                'Transporting must the moment be --',
                'Brewed from decades of Agony!',
                '',
                'To think just how the fire will burn --',
                'Just how long-cheated eyes will turn --',
                'To wonder what myself will say,',
                'And what itself, will say to me --',
                'Beguiles the Centuries of way!',
            ],
        },
        {
            _id: 3,
            title: 'Tho\' I get home how late -- how late',
            author: 'Emily Dickinson',
            lines: [
                'Tho\' I get home how late -- how late --',
                'So I get home - \'twill compensate --',
                'Better will be the Ecstasy',
                'That they have done expecting me --',
                'When Night -- descending -- dumb -- and dark --',
                'They hear my unexpected knock --',
                'Transporting must the moment be --',
                'Brewed from decades of Agony!',
                '',
                'To think just how the fire will burn --',
                'Just how long-cheated eyes will turn --',
                'To wonder what myself will say,',
                'And what itself, will say to me --',
                'Beguiles the Centuries of way!',
            ],
        },
    ],
};

export default (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};

//

//
