import styled from 'styled-components/macro';

const Button = styled.button`
  padding: 0.6em 2em;
  background-color: #626363;
  border: none;
  margin-right: 1em;
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
  font-size: ${({ fontSize }) => fontSize};
`;

export default Button;
