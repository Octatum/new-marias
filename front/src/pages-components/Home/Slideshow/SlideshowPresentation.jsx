import React from 'react';
import PropTypes from 'prop-types';

// Recibe los datos ya procesados y los presenta.
const SlideshowPresentation = (props) => {
  const {
    slides
  } = props;
  
  return (
    "Todo"
  );
}

SlideshowPresentation.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    redirection: PropTypes.shape({
      buttonText: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  })).isRequired,
};

export default SlideshowPresentation;