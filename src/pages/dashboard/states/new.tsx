import React, { useState } from 'react';
import { NextPage } from 'next';
import {
  Stepper, Step, StepLabel, Button, Box, Snackbar,
} from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from '@mui/system';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useRouter } from 'next/router';

import PropertyDataForm from '@/components/Forms/PropertyDataForm';
import DetailsForm from '@/components/Forms/DetailsForm';
import AccountsForm from '@/components/Forms/AccountsForm';
import OwnerForm from '@/components/Forms/OwnerForm';
import Layout from '@/components/common/Layout';

import { IClient } from '@/interfaces/Client';
import { IAccount } from '@/interfaces/Account';
import { IState } from '@/interfaces/State';
import validateForm from '../../../../utils/validateForm';

const ButtonBox = styled('div')({
  position: 'fixed',
  bottom: '150px',
  width: '90%',
  display: 'flex',
  padding: '0 16px',
  background: '#fff',
});

const ContentBox = styled(Box)({
  overflowY: 'auto',
  height: 'calc(100vh - 450px)',
});

const New: NextPage = () => {
  const router = useRouter();
  const steps = ['Datos de la propiedad', 'Detalles', 'Cuentas asociadas', 'Dueño'];
  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  const environment = process.env.NODE_ENV;

  const testData = environment === 'development' ? 'Datos de prueba' : '';
  const testNumber = environment === 'development' ? 123 : 0;
  const testAccount: Array<IAccount> = [{}];
  const testClient: IClient = environment === 'development' ? {
    firstName: 'Juan',
    lastName: 'Pérez',
    secondLastName: 'Gómez',
    mail: 'juan.perez@gmail.com',
    rut: '12345678-9',
    taxId: '789456123',
    birthdate: '1990-01-01',
    notes: 'Cliente de prueba',
    address: {
      street: 'Calle de prueba',
      streetNumber: '123',
      commune: 'Comuna de prueba',
      region: 'Coquimbo',
      apartment: 'Apartamento 456',
      extra: 'Información adicional de prueba',
    },
    phoneNumber: {
      number: '987654321',
      prefix: '+56',
    },
    bankAccount: {
      bank: 'Banco de prueba',
      accountType: 'Cuenta corriente',
      accountNumber: '123456789',
      name: 'Juan Pérez',
      fullName: 'Juan Pérez Gómez',
      mail: 'juan.perez@gmail.com',
      taxId: '789456123',
    },
  } : {
    firstName: '',
    lastName: '',
    secondLastName: '',
    mail: '',
    rut: '',
    taxId: '',
    birthdate: '',
    notes: '',
    address: {
      street: '',
      streetNumber: '',
      commune: '',
      region: '',
      apartment: '',
      extra: '',
    },
    phoneNumber: {
      number: '',
      prefix: '',
    },
    bankAccount: {
      bank: '',
      accountType: '',
      accountNumber: '',
      name: '',
      fullName: '',
      mail: '',
      taxId: '',
    },
  };
  // Ahora, puedes usar estos datos de prueba al establecer tus estados
  const [propertyType, setPropertyType] = useState(testData);
  const [rol, setRol] = useState(testData);
  const [street, setStreet] = useState(testData);
  const [number, setNumber] = useState(testData);
  const [block, setBlock] = useState(testData);
  const [region, setRegion] = useState(testData);
  const [commune, setCommune] = useState(testData);
  const [price, setPrice] = useState(testNumber);
  const [priceSquareMeter, setPriceSquareMeter] = useState(testNumber);
  const [bedrooms, setBedrooms] = useState(testNumber);
  const [bathrooms, setBathrooms] = useState(testNumber);
  const [parkingSpaces, setParkingSpaces] = useState(testNumber);
  const [storageRooms, setStorageRooms] = useState(testNumber);
  const [structureSurface, setStructureSurface] = useState(testNumber);
  const [terraceSurface, setTerraceSurface] = useState(testNumber);
  const [patioSurface, setPatioSurface] = useState(testNumber);
  const [totalSurface, setTotalSurface] = useState(testNumber);
  const [accounts, setAccounts] = useState<IAccount[]>(testAccount);
  const [category, setCategory] = useState(testData);
  const [company, setCompany] = useState(testData);
  const [clientNumber, setClientNumber] = useState(testData);
  const [client, setClient] = useState<IClient>(testClient);

  const handleNext = async () => {
    let requiredFields: Array<{field: string, name: string}> = [];
    switch (activeStep) {
      case 0:
        requiredFields = [
          { field: 'propertyType', name: 'Tipo de propiedad' },
          { field: 'rol', name: 'Rol' },
          { field: 'street', name: 'Calle' },
          { field: 'region', name: 'Región' },
          { field: 'commune', name: 'Comuna' },
          { field: 'price', name: 'Precio' },
          { field: 'priceSquareMeter', name: 'Precio por metro cuadrado' },
        ];
        break;
      case 1:
        requiredFields = [
          { field: 'bedrooms', name: 'Dormitorios' },
          { field: 'bathrooms', name: 'Baños' },
          { field: 'parkingSpaces', name: 'Espacios de estacionamiento' },
          { field: 'storageRooms', name: 'Bodegas' },
          { field: 'structureSurface', name: 'Superficie estructurada' },
          { field: 'terraceSurface', name: 'Superficie de la terraza' },
          { field: 'patioSurface', name: 'Superficie del patio' },
          { field: 'totalSurface', name: 'Superficie total' },
        ];
        break;
      case 2:
        requiredFields = [];
        break;
      case 3:
        requiredFields = [
          { field: 'owner.firstName', name: 'Nombre del cliente' },
          { field: 'owner.lastName', name: 'Apellido del cliente' },
          { field: 'owner.secondLastName', name: 'Segundo apellido del cliente' },
          { field: 'owner.mail', name: 'Correo electrónico del cliente' },
          { field: 'owner.rut', name: 'RUT del cliente' },
          { field: 'owner.birthdate', name: 'Fecha de nacimiento del cliente' },
          { field: 'owner.notes', name: 'Notas del cliente' },
          { field: 'owner.address.street', name: 'Calle de la dirección del cliente' },
          { field: 'owner.address.streetNumber', name: 'Número de calle de la dirección del cliente' },
          { field: 'owner.address.commune', name: 'Comuna de la dirección del cliente' },
          { field: 'owner.address.region', name: 'Región de la dirección del cliente' },
          { field: 'owner.address.apartment', name: 'Apartamento de la dirección del cliente' },
          { field: 'owner.address.extra', name: 'Información adicional de la dirección del cliente' },
          { field: 'owner.phoneNumber.number', name: 'Número de teléfono del cliente' },
          { field: 'owner.phoneNumber.prefix', name: 'Prefijo del número de teléfono del cliente' },
          { field: 'owner.bankAccount.bank', name: 'Banco de la cuenta bancaria del cliente' },
          { field: 'owner.bankAccount.accountType', name: 'Tipo de cuenta bancaria del cliente' },
          { field: 'owner.bankAccount.accountNumber', name: 'Número de cuenta bancaria del cliente' },
          { field: 'owner.bankAccount.name', name: 'Nombre en la cuenta bancaria del cliente' },
          { field: 'owner.bankAccount.fullName', name: 'Nombre completo en la cuenta bancaria del cliente' },
          { field: 'owner.bankAccount.mail', name: 'Correo electrónico en la cuenta bancaria del cliente' },
          { field: 'owner.bankAccount.taxId', name: 'ID de impuesto en la cuenta bancaria del cliente' },
        ];
        break;
      default:
        break;
    }

    const data: IState = {
      propertyType,
      rol,
      street,
      number,
      block,
      region,
      commune,
      price,
      priceSquareMeter,
      bedrooms,
      bathrooms,
      parkingSpaces,
      storageRooms,
      structureSurface,
      terraceSurface,
      patioSurface,
      totalSurface,
      accounts,
      category,
      company,
      owner: client,
    };

    const missingField = validateForm(data, requiredFields);
    if (activeStep < 3 && !missingField) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setSnackbarMessage(`Por favor, rellena el campo ${missingField} o verifica la información de entrada.`);
      setOpenSnackbar(true);
    }
    if (activeStep === 3 && !missingField) {
      try {
        await axios.post('/api/states', data);
        setSnackbarMessage('¡Propiedad creada con éxito!');
        setOpenSuccessSnackbar(true);
        router.push('/dashboard/states/');
      } catch {
        setSnackbarMessage('Hubo un error al crear la propiedad. Por favor intente de nuevo.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddAccount = (account: IAccount) => {
    setAccounts((prevAccounts) => [...prevAccounts, account]);
  };

  const handleDeleteAccount = (index: number) => {
    setAccounts((prevAccounts) => prevAccounts.filter((account, i) => i !== index));
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <PropertyDataForm
            propertyType={propertyType}
            onPropertyTypeChange={setPropertyType}
            rol={rol}
            onRolChange={setRol}
            street={street}
            onStreetChange={setStreet}
            number={number}
            onNumberChange={setNumber}
            block={block}
            onBlockChange={setBlock}
            region={region}
            onRegionChange={setRegion}
            commune={commune}
            onCommuneChange={setCommune}
            price={price}
            onPriceChange={setPrice}
            priceSquareMeter={priceSquareMeter}
            onPriceSquareMeterChange={setPriceSquareMeter}
          />
        );
      case 1:
        return (
          <DetailsForm
            bedrooms={bedrooms}
            onBedroomsChange={setBedrooms}
            bathrooms={bathrooms}
            onBathroomsChange={setBathrooms}
            parkingSpaces={parkingSpaces}
            onParkingSpacesChange={setParkingSpaces}
            storageRooms={storageRooms}
            onStorageRoomsChange={setStorageRooms}
            structureSurface={structureSurface}
            onStructureSurfaceChange={setStructureSurface}
            terraceSurface={terraceSurface}
            onTerraceSurfaceChange={setTerraceSurface}
            patioSurface={patioSurface}
            onPatioSurfaceChange={setPatioSurface}
            totalSurface={totalSurface}
            onTotalSurfaceChange={setTotalSurface}
          />
        );
      case 2:
        return (
          <AccountsForm
            accounts={accounts}
            onAddAccount={handleAddAccount}
            onDeleteAccount={handleDeleteAccount}
            category={category}
            onCategoryChange={setCategory}
            company={company}
            onCompanyChange={setCompany}
            clientNumber={clientNumber}
            onClientNumberChange={setClientNumber}
          />
        );
      case 3:
        return (
          <OwnerForm
            client={client}
            onClientChange={setClient}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Layout>
      <Stepper sx={{ mb: 5 }} activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <ContentBox>
        {getStepContent(activeStep)}
      </ContentBox>
      <ButtonBox>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Atrás
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
        </Button>
      </ButtonBox>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <MuiAlert onClose={() => setOpenSuccessSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          ¡Propiedad creada con éxito!
        </MuiAlert>
      </Snackbar>

    </Layout>
  );
};

export default New;
