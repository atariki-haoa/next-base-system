// PhoneNumberForm.tsx
import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import FormRow from './FormRow';

interface PhoneNumberFormProps {
  index: number;
  onPhoneNumbersChange: (value: IPhoneNumber, index: number) => void;
}

const PhoneNumberForm: React.FC<PhoneNumberFormProps> = (props) => {
  const {
    index,
    onPhoneNumbersChange
  } = props;

  const [number, setNumber] = useState('');
  const [prefix, setPrefix] = useState('');

  useEffect(() => {
    const phoneNumber: IPhoneNumber = {
      prefix,
      number,
    };
    onPhoneNumbersChange(phoneNumber, index);
  }, [number, prefix]);
  
  return (
    <FormRow>
      <TextField
        label="Prefijo"
        value={prefix}
        onChange={(e) => setPrefix(e.target.value)}
      />
      <TextField
        label="Número"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
    </FormRow>
  );
};

export default PhoneNumberForm;
