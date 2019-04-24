export const screenBreakpoints = {
  mobile: 540,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};
export const generateBreakpoint = size => `@media (max-width: ${size})`;

const device = Object.keys(screenBreakpoints).reduce((accumulator, label) => {
  const emSize = screenBreakpoints[label] / 16;
  accumulator[label] = generateBreakpoint(emSize);
  return accumulator;
}, {});

export default device;
