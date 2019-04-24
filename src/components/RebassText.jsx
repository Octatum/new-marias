import React from 'react';
import { Text as RbText } from 'rebass';
import Markdown from 'react-markdown';
import styled from 'styled-components';

function RebassText(props) {
  return <RbText {...props} />;
}

RebassText.defaultProps = {
  color: 'darkgray',
  fontSize: 2,
  fontFamily: 'main',
};

export const MarkdownText = styled(RbText)`
  em {
    font-style: italic;
  }

  strong {
    font-weight: bold;
  }
`;

MarkdownText.defaultProps = {
  as: Markdown,
  ...RebassText.defaultProps,
};

export default RebassText;
