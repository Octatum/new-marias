import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

import device from '../utilities/device';

const defaultSize = 1;
const increments = {
  default: 0.25,
  laptop: 0.2,
  tablet: 0.15,
  mobile: 0.1,
};

const setColor = ({ theme, color = '' }) => {
  const { colors } = theme;

  if (color.toLowerCase() === 'gray') {
    return colors.gray;
  }

  if (color.toLowerCase() === 'white') {
    return colors.white;
  }

  if (color.toLowerCase() === 'palebrown') {
    return colors.palebrown;
  }

  if (color.toLowerCase() === 'slategray') {
    return colors.slategray;
  }

  return colors.darkgray;
};

const setWeight = ({ bold }) => {
  bold = bold || false;

  return bold ? '700' : 'initial';
};

const setFontSize = ({ size }, increment) => {
  size = size || 1;

  return `${defaultSize + increment * (size - 1)}em`;
};

const setAlign = ({ align }) => {
  return align || 'inherit';
};

const setFontFamily = ({ theme, secondaryFont = false }) => {
  return secondaryFont ? theme.fonts.secondary : theme.fonts.main;
};

export const withTextStyle = component => styled(component)`
  line-height: ${({ lineHeight }) => lineHeight || '1.2em'};
  font-family: ${setFontFamily};
  color: ${setColor};
  font-size: ${props => setFontSize(props, increments.default)};
  font-weight: ${setWeight};
  text-align: ${setAlign};
  text-decoration: none;

  ${device.laptop} {
    font-size: ${props => setFontSize(props, increments.laptop)};
  }

  ${device.tablet} {
    font-size: ${props => setFontSize(props, increments.tablet)};
  }

  ${device.mobile} {
    font-size: ${props => setFontSize(props, increments.mobile)};
  }
`;

const Text = withTextStyle('div');

Text.propTypes = {
  // Por cuestiones de accesibilidad, no es conveniente usar textos directamente en un div
  // por lo que hay que especificar el tipo de tag de html que se usará en el componente.
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default Text;
