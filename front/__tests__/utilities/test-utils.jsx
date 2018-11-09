import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';

import theme from '../../src/utilities/theme';

const customRenderer = (node, ...options) => {
  return render(
    <ThemeProvider theme={theme}>{node}</ThemeProvider>,
    ...options
  );
};

export * from 'react-testing-library';

export { customRenderer as renderer };
