import styled from 'styled-components/macro';
import device from '../utilities/device';

function setTemplates(data) {
  if (Array.isArray(data)) {
    return data.map(d => `${d}fr`).join(' ');
  }
  if (Number.isInteger(data)) {
    return `repeat(${data}, 1fr)`;
  }

  return data;
}

const Grid = function(props) {
  const {
    columns,
    rows,
    mobileColumns,
    mobileRows,
    tabletColumns,
    tabletRows,
    laptopColumns,
    laptopRows,
    areas,
    flow,
    as: tag,
  } = props;

  return styled(tag)`
    display: grid;
    grid-template-columns: ${setTemplates(columns)};
    grid-template-rows: ${setTemplates(rows)};
    grid-template-areas: ${areas};
    ${flow && `grid-auto-flow: ${flow};`} ${device.mobile} {
      grid-template-columns: ${setTemplates(mobileColumns)};
      grid-template-rows: ${setTemplates(mobileRows)};
    }

    ${device.tablet} {
      grid-template-columns: ${setTemplates(tabletColumns)};
      grid-template-rows: ${setTemplates(tabletRows)};
    }

    ${device.laptop} {
      grid-template-columns: ${setTemplates(laptopColumns)};
      grid-template-rows: ${setTemplates(laptopRows)};
    }
  `;
};

Grid.defaultProps = {
  as: 'div',
};

export default Grid;
