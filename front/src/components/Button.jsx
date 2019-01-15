import styled from 'styled-components/macro';

const Button = styled.button`
  padding: 0.6em 2em;
  background-color: ${({theme}) => theme.colors.pink};
  border: none;
  margin-right: 1em;
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-decoration: none;
  color: #ffffff;
  font-size: ${({ fontSize }) => fontSize};

  ${({ theme, color }) =>
    color === 'palebrown' &&
    `
    background-color: ${theme.colors.palebrown};
  `}

  ${({ theme, color }) =>
    color === 'orange' &&
    `
    background-color: ${theme.colors.orange};
  `}
`;

export default Button;
