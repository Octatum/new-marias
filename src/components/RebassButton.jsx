import { Text as RebassText } from 'rebass';
import styled from 'styled-components';

const RebassButton = styled(RebassText)`
  border: none;
`;

RebassButton.defaultProps = {
  as: 'button',
  color: 'white',
  fontSize: 2,
  bg: 'pink',
};

export default RebassButton;
