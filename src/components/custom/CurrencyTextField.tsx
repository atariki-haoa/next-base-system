import React, { useState, useEffect } from 'react';
import {
  FormControl, InputLabel, OutlinedInput, OutlinedInputProps,
} from '@mui/material';

interface CurrencyInputProps extends Omit<OutlinedInputProps, 'onChange'> {
  value: number;
  label: string;
  // eslint-disable-next-line no-unused-vars
  onValueChange: (value: number) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value, onValueChange, label, ...props
}) => {
  const [displayValue, setDisplayValue] = useState(() => formatCurrency(value));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value;
    const currency = parseCurrency(inputVal);
    setDisplayValue(formatCurrency(currency));
    onValueChange(currency);
  };

  useEffect(() => {
    setDisplayValue(formatCurrency(value));
  }, [value]);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        value={displayValue}
        onChange={handleChange}
        startAdornment={<span>$</span>}
        label={label}
        {...props}
      />
    </FormControl>
  );
};

const formatCurrency = (value: number): string => new Intl.NumberFormat('es-CL').format(value);

const parseCurrency = (value: string): number => {
  const numericValue = Number(value.replace(/[^0-9]/g, ''));
  return Number.isNaN(numericValue) ? 0 : numericValue;
};

export default CurrencyInput;
