import React, { PropTypes } from 'react';

// todo: replace with fancy audio component

const Audio = ({ src }) => (
    <audio style={{ width: '100%' }} src={src} controls />
);

Audio.propTypes = {
    src: PropTypes.string.isRequired,
};

export default Audio;
