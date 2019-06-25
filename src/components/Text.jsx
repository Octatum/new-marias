import styled from 'styled-components/macro';

import device from '../utilities/device';

const defaultSize = 1;
const increments = {
  default: 0.25,
  laptop: 0.2,
  tablet: 0.15,
  mobile: 0.1,
};

const setColor = ({ theme, color = 'darkgray' }) => {
  return theme.colors[color];
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

const setFontFamily = ({ theme }) => {
  return theme.fonts.main;
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

export default Text;
