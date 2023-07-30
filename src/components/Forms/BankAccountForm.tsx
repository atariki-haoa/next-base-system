// BankAccountForm.tsx
import React from 'react';
import { TextField } from '@mui/material';
import FormRow from './FormRow';

interface BankAccountFormProps {
  name: string;
  onNameChange: (value: string) => void;
  accountNumber: string;
  onAccountNumberChange: (value: string) => void;
  // Aquí puedes agregar los demás campos
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({ name, onNameChange, accountNumber, onAccountNumberChange }) => {
  return (
    <FormRow>
      <TextField label="Nombre" value={name} onChange={(event) => onNameChange(event.target.value)} />
      <TextField label="Número de cuenta" value={accountNumber} onChange={(event) => onAccountNumberChange(event.target.value)} />
      <TextField label="Tipo de cuenta" value={accountNumber} onChange={(event) => onAccountNumberChange(event.target.value)} />
      <TextField label="Banco" value={accountNumber} onChange={(event) => onAccountNumberChange(event.target.value)} />
    </FormRow>
  );
};

export default BankAccountForm;
