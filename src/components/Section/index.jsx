import styled from 'styled-components';
import PropTypes from 'prop-types';

import device from '../../utilities/device';

const defaultHorizontalMargin = '2em';
const tabletHorizontalMargin = '1em';
const mobileHorizontalMargin = '0.5em';

// Demostracion de como pueden ser usadas las props para renderizar diferentes
// layouts o estilos dentro de un componente.
// Tambien aqui se demuestra como pueden ser usados los media queries haciendo
// uso de utils/device
const Section = styled.section`
  margin: 3em ${({ fluid }) => (fluid ? 0 : defaultHorizontalMargin)};
  flex: 1;

  ${device.tablet} {
    margin: 3em ${({ fluid }) => (fluid ? 0 : tabletHorizontalMargin)};
  }

  ${device.mobile} {
    margin: 3em ${({ fluid }) => (fluid ? 0 : mobileHorizontalMargin)};
  }
`;

Section.propTypes = {
  fluid: PropTypes.bool,
};

Section.defaultProps = {
  fluid: false,
};

export default Section;
