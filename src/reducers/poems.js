import { createSelector } from 'reselect';
import debug from 'debug';

const log = debug('ap.poems.reducer'); // eslint-disable-line no-unused-vars

//

//

const initialState = {
    poemsById: {
        1: {
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
        '56f5cf810647d37a244bc325': {
            _id: '56f5cf810647d37a244bc325',
            title: 'My Soul Is Dark',
            author: 'George Gordon, Lord Byron',
            lines: [
                'My soul is dark--Oh! quickly string',
                ' The harp I yet can brook to hear;',
                'And let thy gentle fingers fling',
                ' Its melting murmurs o\'er mine ear.',
                'If in this heart a hope be dear,',
                ' That sound shall charm it forth again:',
                'If in these eyes there lurk a tear,',
                '\'Twill flow, and cease to burn my brain.',
                '',
                'But bid the strain be wild and deep,',
                ' Nor let thy notes of joy be first:',
                'I tell thee, minstrel, I must weep,',
                ' Or else this heavy heart will burst;',
                'For it hath been by sorrow nursed,',
                ' And ached in sleepless silence long;',
                'And now \'tis doomed to know the worst,',
                ' And break at once--or yield to song.',
            ],
        },
        '56f5cf830647d37a244bca66': {
            _id: '56f5cf830647d37a244bca66',
            title: 'Sonnet 113: Since I left you, mine eye is in my mind',
            author: 'William Shakespeare',
            lines: [
                'Since I left you, mine eye is in my mind;',
                'And that which governs me to go about',
                'Doth part his function and is partly blind,',
                'Seems seeing, but effectually is out;',
                'For it no form delivers to the heart',
                'Of bird, of flower, or shape which it doth latch:',
                'Of his quick objects hath the mind no part,',
                'Nor his own vision holds what it doth catch;',
                'For if it see the rud\'st or gentlest sight,',
                'The most sweet favour or deformed\'st creature,',
                'The mountain or the sea, the day or night:',
                'The crow, or dove, it shapes them to your feature.',
                ' Incapable of more, replete with you,',
                ' My most true mind thus maketh mine untrue.',
            ],
        },
    },
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

