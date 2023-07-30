import React, { useState } from 'react';
import { NextPage } from 'next';
import {
  Stepper, Step, StepLabel, Button, Box, Snackbar,
} from '@mui/material';
import { styled } from '@mui/system';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

import PropertyDataForm from '@/components/Forms/PropertyDataForm';
import DetailsForm from '@/components/Forms/DetailsForm';
import AccountsForm from '@/components/Forms/AccountsForm';
import OwnerForm from '@/components/Forms/OwnerForm';
import Layout from '@/components/common/Layout';

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
  const steps = ['Datos de la propiedad', 'Detalles', 'Cuentas asociadas', 'Dueño'];
  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // States for errors
  const [ownerError, setOwnerError] = useState({ telefono: false, rut: false, email: false });

  // States for PropertyDataForm
  const [propertyType, setPropertyType] = useState('');
  const [rol, setRol] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [block, setBlock] = useState('');
  const [region, setRegion] = useState('');
  const [commune, setCommune] = useState('');
  const [price, setPrice] = useState(0);
  const [priceSquareMeter, setPriceSquareMeter] = useState(0);

  // States for DetailsForm
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [parkingSpaces, setParkingSpaces] = useState(0);
  const [storageRooms, setStorageRooms] = useState(0);
  const [structureSurface, setStructureSurface] = useState(0);
  const [terraceSurface, setTerraceSurface] = useState(0);
  const [patioSurface, setPatioSurface] = useState(0);
  const [totalSurface, setTotalSurface] = useState(0);

  // States for AccountsForm
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [clientNumber, setClientNumber] = useState('');

  const [error, setError] = useState(false);

  // States for OwnerForm
  const [client, setClient] = useState<IClient>({
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
  });

  const validateForm = () => {
    let isValid = true;
    switch (activeStep) {
      case 0:
        if (!propertyType || !rol || !street || !region || !commune || !price || !priceSquareMeter) {
          isValid = false;
        }
        break;
      case 1:
        if (!bedrooms || !bathrooms || !parkingSpaces || !storageRooms || !structureSurface || !terraceSurface || !patioSurface || !totalSurface) {
          isValid = false;
        }
        break;
      case 2:
        if (!accounts.length || !category || !company || !clientNumber) {
          isValid = false;
        }
        break;
      case 3:
        if (!client.firstName || !client.lastName || !client.secondLastName || !client.mail || !client.rut || !client.taxId || !client.birthdate || !client.notes || !client.address.street || !client.address.streetNumber || !client.address.commune || !client.address.region || !client.address.apartment || !client.address.extra || !client.phoneNumber.number || !client.phoneNumber.prefix || !client.bankAccount.bank || !client.bankAccount.accountType || !client.bankAccount.accountNumber || !client.bankAccount.name || !client.bankAccount.fullName || !client.bankAccount.mail || !client.bankAccount.taxId) {
          isValid = false;
        }
        break;

      default:
        break;
    }
    if (!isValid) {
      setSnackbarMessage('Por favor, rellena todos los campos necesarios o verifica la información de entrada.');
      setOpenSnackbar(true);
    }
    return isValid;
  };

  const handleNext = async () => {
    if (activeStep < 3) {
      if (validateForm()) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
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
      if (validateForm()) {
        try {
          const response = await axios.post('/api/states', data);
          setSnackbarMessage('¡Propiedad creada con éxito!');
          setOpenSnackbar(true);
        } catch (err) {
          console.error('Error al crear State:', err);
          setSnackbarMessage('Hubo un error al crear la propiedad. Por favor intente de nuevo.');
          setOpenSnackbar(true);
        }
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
    </Layout>
  );
};

export default New;
