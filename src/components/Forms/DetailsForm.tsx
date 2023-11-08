import React from 'react';
import { Typography } from '@mui/material';
import FormRow from './FormRow';
import { FullTextField } from '@/styles/Custom';

interface DetailsFormProps {
  bedrooms: number;
  onBedroomsChange: (value: number) => void;
  bathrooms: number;
  onBathroomsChange: (value: number) => void;
  parkingSpaces: number;
  onParkingSpacesChange: (value: number) => void;
  storageRooms: number;
  onStorageRoomsChange: (value: number) => void;
  structureSurface: number;
  onStructureSurfaceChange: (value: number) => void;
  terraceSurface: number;
  onTerraceSurfaceChange: (value: number) => void;
  patioSurface: number;
  onPatioSurfaceChange: (value: number) => void;
  totalSurface: number;
    onTotalSurfaceChange: (value: number) => void;
}

const DetailsForm: React.FC<DetailsFormProps> = (props) => {
  const {
    bedrooms,
    onBedroomsChange,
    bathrooms,
    onBathroomsChange,
    parkingSpaces,
    onParkingSpacesChange,
    storageRooms,
    onStorageRoomsChange,
    structureSurface,
    onStructureSurfaceChange,
    terraceSurface,
    onTerraceSurfaceChange,
    patioSurface,
    onPatioSurfaceChange,
    totalSurface,
    onTotalSurfaceChange,
  } = props;

  return (
    <>
      <Typography variant="h4">
        Detalles de la propiedad
      </Typography>
      <Typography variant="subtitle1">
        Datos varios de la propiedad
      </Typography>
      <FormRow>
        <FullTextField label="Número de dormitorios" type="number" value={bedrooms} onChange={(event: any) => onBedroomsChange(Number(event.target.value))} />
        <FullTextField label="Número de baños" type="number" value={bathrooms} onChange={(event: any) => onBathroomsChange(Number(event.target.value))} />
        <FullTextField label="Número de estacionamientos" type="number" value={parkingSpaces} onChange={(event: any) => onParkingSpacesChange(Number(event.target.value))} />
        <FullTextField label="Número de bodegas" type="number" value={storageRooms} onChange={(event: any) => onStorageRoomsChange(Number(event.target.value))} />
      </FormRow>
      <FormRow>
        <FullTextField label="Superficie de estructuras" type="number" value={structureSurface} onChange={(event: any) => onStructureSurfaceChange(Number(event.target.value))} />
        <FullTextField label="Superficie de terrazas" type="number" value={terraceSurface} onChange={(event: any) => onTerraceSurfaceChange(Number(event.target.value))} />
      </FormRow>
      <FormRow>
        <FullTextField label="Superficie de patios" type="number" value={patioSurface} onChange={(event: any) => onPatioSurfaceChange(Number(event.target.value))} />
        <FullTextField label="Superficie total" type="number" value={totalSurface} onChange={(event: any) => onTotalSurfaceChange(Number(event.target.value))} />
      </FormRow>
    </>
  );
};

export default DetailsForm;
