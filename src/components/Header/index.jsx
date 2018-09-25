import styled from 'styled-components';

// Demostracion de uso de ThemeConsumer
const Header = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.sizes.h1};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

export default Header;
