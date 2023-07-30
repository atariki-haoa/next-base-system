import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import FormRow from './FormRow';
import { FixedDivider, FullTextField, WhiteSpace } from '@/styles/Custom';
import CustomSelect from '../Custom/CustomSelect';
import Regions from '@/data/regions.json';
import Banks from '@/data/banks.json';
import RutField from '../Custom/RutField';

interface OwnerFormProps {
  client: IClient;
  onClientChange: (value: IClient) => void;
}

const OwnerForm: React.FC<OwnerFormProps> = (props) => {
  const {
    client,
    onClientChange,
  } = props;

  const { banks } = Banks;
  const { regions } = Regions;
  const [communes, setCommunes] = useState<{ value: string, label: string }[]>([]);

  const onAddressChange = (address: IAddress) => {
    onClientChange({ ...client, address });
  };

  const onPhoneNumberChange = (phoneNumber: IPhoneNumber) => {
    onClientChange({ ...client, phoneNumber });
  };

  const onBankAccountChange = (bankAccount: IBankAccount) => {
    onClientChange({ ...client, bankAccount });
  };

  useEffect(() => {
    const region = regions.find(r => r.name === client.address.region);
    if (region) {
      setCommunes(region.communes.map(c => ({
        value: c.name,
        label: c.name,
      })));
    }
  }
    , [client.address.region]);

  return (
    <>
      <Typography variant="h4">
        Datos del dueño
      </Typography>
      <Typography variant="subtitle1">
        Todos los datos personales relevantes del dueño de la propiedad.
      </Typography>
      <FixedDivider />
      <Typography variant="h5">
        Datos personales
      </Typography>
      <FormRow>
        <FullTextField label="Nombre" value={client.firstName} onChange={(event: any) => onClientChange({ ...client, firstName: event.target.value })} />
        <FullTextField label="Apellido" value={client.lastName} onChange={(event: any) => onClientChange({ ...client, lastName: event.target.value })} />
        <FullTextField label="Segundo apellido" value={client.secondLastName} onChange={(event: any) => onClientChange({ ...client, secondLastName: event.target.value })} />
        <FullTextField
          label="Correo electrónico"
          value={client.mail}
          onChange={(event: any) => {
            onClientChange({ ...client, mail: event.target.value });
            // setError({ ...error, email: !emailValidator(event.target.value) });
          }}
        />
      </FormRow>
      <FormRow>
        <RutField
          label="RUT"
          value={client.rut}
          onChange={(event: any) => {
            onClientChange({ ...client, rut: event.target.value });
            // setError({ ...error, rut: !rutValidator(event.target.value) });
          }}
        />
        <FullTextField 
        type="date" 
        label="Fecha de nacimiento" 
        value={client.birthdate} 
        onChange={(event: any) => onClientChange({ ...client, birthdate: event.target.value })} 
        InputLabelProps={{
          shrink: true,
        }}
        />
        <FullTextField label="Notas" value={client.notes} onChange={(event: any) => onClientChange({ ...client, notes: event.target.value })} />
      </FormRow>
      <WhiteSpace />
      <Typography variant="h5">
        Dirección y contacto
      </Typography>
      <FormRow>
        <FullTextField label="Calle" value={client.address.street} onChange={(event: any) => onAddressChange({ ...client.address, street: event.target.value })} />
        <FullTextField label="Número de calle" value={client.address.streetNumber} onChange={(event: any) => onAddressChange({ ...client.address, streetNumber: event.target.value })} />
        <CustomSelect
          label='Región'
          value={client.address.region}
          onChange={(value) => {
            onAddressChange({ ...client.address, region: value });

          }}
          options={regions.map(r => ({
            value: r.name,
            label: r.name,
          }))} />
        <CustomSelect
          label='Comuna'
          value={client.address.commune}
          onChange={(value) => onAddressChange({ ...client.address, commune: value })}
          options={communes}
        />
      </FormRow>
      <FormRow>
        <FullTextField label="Apartamento" value={client.address.apartment} onChange={(event: any) => onAddressChange({ ...client.address, apartment: event.target.value })} />
        <FullTextField label="Extra" value={client.address.extra} onChange={(event: any) => onAddressChange({ ...client.address, extra: event.target.value })} />
      </FormRow>
      <FormRow>
        <FullTextField
          label="Número de teléfono"
          value={client.phoneNumber.number}
          onChange={(event: any) => {
            onPhoneNumberChange({ ...client.phoneNumber, number: event.target.value });
            // setError({ ...error, telefono: phoneValidator(event.target.value) });
          }}
        />
        <CustomSelect
          label="Tipo de teléfono"
          value={client.phoneNumber.prefix}
          onChange={(value: string) => onPhoneNumberChange({ ...client.phoneNumber, prefix: value })}
          options={[
            { label: "Móvil", value: "Mobile" },
            { label: "Fijo", value: "Fixed" },
            // Añade aquí las opciones que necesites...
          ]}
        />
      </FormRow>
      <WhiteSpace />
      <Typography variant="h5">
        Cuenta bancaria
      </Typography>
      <FormRow>
        <FullTextField label="Identificador" value={client.bankAccount.name} onChange={(event: any) => onBankAccountChange({ ...client.bankAccount, name: event.target.value })} />
        <FullTextField label="Nombre completo" value={client.bankAccount.fullName} onChange={(event: any) => onBankAccountChange({ ...client.bankAccount, fullName: event.target.value })} />
      </FormRow>
      <FormRow>
        <FullTextField label="Correo electrónico" value={client.bankAccount.mail} onChange={(event: any) => onBankAccountChange({ ...client.bankAccount, mail: event.target.value })} />
        <RutField 
        label="RUT"
        value={client.bankAccount.taxId}
        onChange={(event: any) => {
          onBankAccountChange({ ...client.bankAccount, taxId: event.target.value });
          // setError({ ...error, rut: !rutValidator(event.target.value) });
        }} />
      </FormRow>
      <FormRow>
        <CustomSelect
          label="Banco"
          value={client.bankAccount.bank}
          onChange={(value: string) => onBankAccountChange({ ...client.bankAccount, bank: value })}
          options={banks.map(b => ({
            value: b.name,
            label: b.name,
          }))}
        />
        <CustomSelect
          label="Tipo de cuenta"
          value={client.bankAccount.accountType}
          onChange={(value: string) => onBankAccountChange({ ...client.bankAccount, accountType: value })}
          options={[
            { label: "Cuenta corriente", value: "corriente" },
            { label: "Cuenta de ahorro", value: "ahorro" },
            { label: "Cuenta vista", value: "vista" },
          ]}
        />
        <FullTextField label="Número de cuenta" value={client.bankAccount.accountNumber} onChange={(event: any) => onBankAccountChange({ ...client.bankAccount, accountNumber: event.target.value })} />
      </FormRow>
    </>
  );
};

export default OwnerForm;
