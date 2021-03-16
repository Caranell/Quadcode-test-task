import React from 'react';
import {
  Checkbox as MUICheckbox,
  FormControlLabel,
} from '@material-ui/core';
import styled from 'styled-components';

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-bottom: 0;
  margin-top: auto;
`;

type CheckboxProps = {
  checked?: boolean;
  label: string;
  onChange: (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  label,
  onChange,
}) => (
  <StyledFormControlLabel
    control={<MUICheckbox checked={checked || false} color="primary" onChange={onChange} />}
    label={label}
  />
);
