import React from 'react';
import styled from 'styled-components';
import Text from './Text';
import downArrow from './assets/ico-select.svg';

const Option = styled('option')``;

const Label = styled('label')`
  display: flex;
  flex-direction: column;
`;

const SelectField = styled('select')`
  appearance: none;
  font-size: 18px;
  box-sizing: border-box;
  height: 2em;
  padding-left: 1em;
  font-family: ${({ theme }) => theme.fonts.main};
  border: 1px solid ${({ theme }) => theme.colors.slategray};
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.darkgray};
  background: white; 
  background-image: url('${downArrow}');     
  background-repeat: no-repeat;
  background-position: right 12px center;
  position: relative;
  padding-left: 12px;

  :disabled {
    opacity: 0.6;
  }
`;

const Select = props => {
  const {
    options = [],
    placeholder,
    setFieldValue,
    labelText,
    name,
    selectedOption,
    values,
    ...rest
  } = props;

  return (
    <Label>
      {labelText && (
        <Text size={2} style={{ paddingBottom: '0.5em' }}>
          {labelText}
        </Text>
      )}
      <SelectField
        onChange={event => setFieldValue(name, event.target.value)}
        name={name}
        value={selectedOption}
        {...rest}
      >
        {options.map(option => {
          if (typeof option === 'object') {
            const { name, value } = option;
            return (
              <Option key={name} value={value}>
                {name}
              </Option>
            );
          }

          return (
            <Option key={option} value={option}>
              {option}
            </Option>
          );
        })}
      </SelectField>
    </Label>
  );
};

export default Select;
