import React from 'react';
import styled from 'styled-components';
import Text from './Text';

const Option = styled('option')``;

const Label = styled('label')`
  display: flex;
  flex-direction: column;
`;

const SelectField = styled('select')`
  font-size: 18px;
  box-sizing: border-box;
  height: 2em;
  padding-left: 1em;
  font-family: 'Archivo Narrow', sans-serif;
  color: ${({ theme }) => theme.colors.darkgray};
  background: white;
`;

const Select = props => {
  const {
    options,
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
        {options &&
          options.map(option => {
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
