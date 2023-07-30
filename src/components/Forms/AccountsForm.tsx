import React from 'react';
import { TextField, 
  Select, 
  MenuItem, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Box, 
  Tooltip, 
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FormRow from './FormRow';
import CustomSelect from '../Custom/CustomSelect';
import { FixedDivider } from '@/styles/Custom';

interface Account {
  category: string;
  company: string;
  clientNumber: string;
}

interface AccountsFormProps {
  accounts: Account[];
  onAddAccount: (account: Account) => void;
  onDeleteAccount: (index: number) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  company: string;
  onCompanyChange: (value: string) => void;
  clientNumber: string;
  onClientNumberChange: (value: string) => void;
}

const AccountsForm: React.FC<AccountsFormProps> = (props) => {
  const { 
    accounts, 
    onAddAccount, 
    onDeleteAccount, 
    category, 
    onCategoryChange, 
    company, 
    onCompanyChange, 
    clientNumber, 
    onClientNumberChange 
  } = props;

  const handleAddAccount = () => {
    const newAccount: Account = {
      category,
      company,
      clientNumber,
    };

    onAddAccount(newAccount);
  };

  const handleDeleteAccount = (index: number) => {
    onDeleteAccount(index);
  };

  const handleConsult = () => {
    // Aquí deberías implementar la lógica de la consulta
  };

  return (
    <>
      <Typography variant="h4">
        Cuentas asociadas
      </Typography>
      <Typography variant="subtitle1">
        Cuentas de servicios basicos asociadas al cliente
      </Typography>
      <FixedDivider />
      <FormRow>
        <CustomSelect 
        label="Categoría" 
        options={[
          { value: 'luz', label: 'Luz' },
          { value: 'agua', label: 'Agua' },
          { value: 'gas', label: 'Gas' },
        ]}
          value={category}
          onChange={onCategoryChange}
        />
        <TextField value={company} label="Compañía" onChange={(event) => onCompanyChange(event.target.value)} />
        <TextField value={clientNumber} label="Número de cliente" onChange={(event) => onClientNumberChange(event.target.value)} />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
          <Button variant="contained" color="secondary" onClick={handleConsult}>
            Consultar
          </Button>
          <Tooltip title="Agregar">
            <IconButton color="primary" onClick={handleAddAccount}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </FormRow>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Compañía</TableCell>
              <TableCell>Número de cliente</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account, index) => (
              <TableRow key={index}>
                <TableCell>{account.category}</TableCell>
                <TableCell>{account.company}</TableCell>
                <TableCell>{account.clientNumber}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteAccount(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AccountsForm;
