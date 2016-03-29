import React, { PropTypes } from 'react';

const Thumbnail = ({ className, height, url, width }) => (
    <div
        className={className}
        style={{
            display: 'inline-block',
            backgroundImage: `url(${url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height,
            width,
        }}
    />
);

Thumbnail.propTypes = {
    className: PropTypes.string,
    height: PropTypes.number.isRequired,
    url: PropTypes.string,
    width: PropTypes.number.isRequired,
};

export default Thumbnail;
