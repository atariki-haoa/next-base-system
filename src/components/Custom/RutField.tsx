import React, {
  ChangeEvent, useState, FC, ComponentProps,
} from 'react';
import { TextField } from '@mui/material';
import { validateRut } from 'rutlib';

type TextFieldProps = ComponentProps<typeof TextField>;

interface RutFieldProps extends TextFieldProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RutField: FC<RutFieldProps> = ({ onChange, ...props }) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleRutChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rut = event.target.value;
    if (!validateRut(rut)) {
      setError(true);
      setHelperText('RUT inválido');
    } else {
      setError(false);
      setHelperText('');
    }
    if (onChange) onChange(event);
  };

  return (
    <TextField
      sx={{ width: '100%' }}
      {...props}
      error={error}
      helperText={helperText}
      onChange={handleRutChange}
    />
  );
};

export default RutField;
