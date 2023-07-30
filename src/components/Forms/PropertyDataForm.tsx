import React, { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';

import FormRow from './FormRow';
import CustomSelect from '../Custom/CustomSelect';
import Regions from '@/data/regions.json';
import CurrencyTextField from '../Custom/CurrencyTextField';

interface PropertyDataFormProps {
  propertyType: string;
  onPropertyTypeChange: (value: string) => void;
  rol: string;
  onRolChange: (value: string) => void;
  street: string;
  onStreetChange: (value: string) => void;
  number: string;
  onNumberChange: (value: string) => void;
  block: string;
  onBlockChange: (value: string) => void;
  region: string;
  onRegionChange: (value: string) => void;
  commune: string;
  onCommuneChange: (value: string) => void;
  price: number;
  onPriceChange: (value: number) => void;
  priceSquareMeter: number;
  onPriceSquareMeterChange: (value: number) => void;
}

const PropertyDataForm: React.FC<PropertyDataFormProps> = (props) => {
  const { 
    propertyType, 
    onPropertyTypeChange, 
    rol, 
    onRolChange, 
    street, 
    onStreetChange, 
    number, 
    onNumberChange, 
    block, 
    onBlockChange, 
    region, 
    onRegionChange, 
    commune, 
    onCommuneChange,
    price,
    onPriceChange,
    priceSquareMeter,
    onPriceSquareMeterChange,
  } = props;
  const { regions } = Regions;
  const [communes, setCommunes] = useState<{value: string, label: string}[]>([]);

  useEffect(() => {
    const region = regions.find(r => r.name === props.region);
    if (region) {
      setCommunes(region.communes.map(c => ({
        value: c.name,
        label: c.name,
      })));
    }
  }
  , [props.region]);

  
  return (
    <>
    <Typography variant="h4">
        Datos principales
      </Typography>
      <Typography variant="subtitle1">
        Los datos principales de la propiedad
      </Typography>
      <FormRow>
        <CustomSelect 
            label="Tipo de propiedad"
            value={propertyType} 
            onChange={onPropertyTypeChange}
            options={[
              { value: 'casa', label: 'Casa' },
              { value: 'departamento', label: 'Departamento' },
              { value: 'bodega', label: 'Bodega' },
              { value: 'oficina', label: 'Oficina' },
              { value: 'terreno', label: 'Terreno' },
            ]} />
        <TextField fullWidth label="Rol" value={rol} onChange={(event) => onRolChange(event.target.value)} />
      </FormRow>
      <FormRow>
        <CurrencyTextField label="Precio" value={price} onValueChange={(value) => onPriceChange(value)} />
        <CurrencyTextField  label="Precio por metro cuadrado" value={priceSquareMeter} onValueChange={(value) => onPriceSquareMeterChange(value)} />
      </FormRow>
      <FormRow>
        <TextField fullWidth label="Calle" value={street} onChange={(event) => onStreetChange(event.target.value)} />
        <TextField fullWidth label="Número" value={number} onChange={(event) => onNumberChange(event.target.value)} />
        <TextField fullWidth label="Bloque" value={block} onChange={(event) => onBlockChange(event.target.value)} />
      </FormRow>
      <FormRow>
        <CustomSelect 
          label='Región'
          value={region} 
          onChange={onRegionChange}
          options={regions.map(r => ({
            value: r.name,
            label: r.name,
          }))} />
        <CustomSelect 
          label='Comuna'
          value={commune} 
          onChange={onCommuneChange} 
          options={communes}
          />
      </FormRow>
    </>
  );
};

export default PropertyDataForm;
