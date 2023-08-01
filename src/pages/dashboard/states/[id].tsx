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

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const res = await axios.get(`http://localhost:3000/api/states/${id}`);
  const { data } = res;

  // Pasar los datos a la página a través de las props
  return { props: { data } };
}

interface PropertyPageProps {
    data: IState;
  }

const PropertyPage: NextPage<PropertyPageProps> = ({ data }) => {
  const router = useRouter();
  const steps = ['Datos de la propiedad', 'Detalles', 'Cuentas asociadas', 'Dueño'];
  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  // States for PropertyDataForm
  const [propertyType, setPropertyType] = useState(data.propertyType);
  const [rol, setRol] = useState(data.rol);
  const [street, setStreet] = useState(data.street);
  const [number, setNumber] = useState(data.number);
  const [block, setBlock] = useState(data.block);
  const [region, setRegion] = useState(data.region);
  const [commune, setCommune] = useState(data.commune);
  const [price, setPrice] = useState(data.price);
  const [priceSquareMeter, setPriceSquareMeter] = useState(data.priceSquareMeter);

  // States for DetailsForm
  const [bedrooms, setBedrooms] = useState(data.bedrooms);
  const [bathrooms, setBathrooms] = useState(data.bathrooms);
  const [parkingSpaces, setParkingSpaces] = useState(data.parkingSpaces);
  const [storageRooms, setStorageRooms] = useState(data.storageRooms);
  const [structureSurface, setStructureSurface] = useState(data.structureSurface);
  const [terraceSurface, setTerraceSurface] = useState(data.terraceSurface);
  const [patioSurface, setPatioSurface] = useState(data.patioSurface);
  const [totalSurface, setTotalSurface] = useState(data.totalSurface);

  // States for AccountsForm
  const [accounts, setAccounts] = useState<IAccount[]>(data.accounts);
  const [category, setCategory] = useState(data.category);
  const [company, setCompany] = useState(data.company);
  const [clientNumber, setClientNumber] = useState(data.owner.clientNumber);

  const [client, setClient] = useState<IClient>({
    firstName: data.owner.firstName,
    lastName: data.owner.lastName,
    secondLastName: data.owner.secondLastName,
    mail: data.owner.mail,
    rut: data.owner.rut,
    taxId: data.owner.taxId,
    birthdate: data.owner.birthdate,
    notes: data.owner.notes,
    address: {
      street: data.owner.address?.street,
      streetNumber: data.owner.address?.streetNumber,
      commune: data.owner.address?.commune,
      region: data.owner.address?.region,
      apartment: data.owner.address?.apartment,
      extra: data.owner.address?.extra,
    },
    phoneNumber: {
      number: data.owner.phoneNumber.number,
      prefix: data.owner.phoneNumber.prefix,
    },
    bankAccount: {
      bank: data.owner.bankAccount.bank,
      accountType: data.owner.bankAccount.accountType,
      accountNumber: data.owner.bankAccount.accountNumber,
      name: data.owner.bankAccount.name,
      fullName: data.owner.bankAccount.fullName,
      mail: data.owner.bankAccount.mail,
      taxId: data.owner.bankAccount.taxId,
    },
  });

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

    const newData: IState = {
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

    const missingField = validateForm(newData, requiredFields);
    if (activeStep < 3 && !missingField) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setSnackbarMessage(`Por favor, rellena el campo ${missingField} o verifica la información de entrada.`);
      setOpenSnackbar(true);
    }
    if (activeStep === 3 && !missingField) {
      try {
        await axios.post('/api/states', newData);
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

export default PropertyPage;
