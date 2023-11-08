import { IAccount } from './Account';

export interface IState {
  id?: string;
  propertyType: string;
  rol: string;
  street: string;
  number: string;
  block: string;
  region: string;
  commune: string;
  price: number;
  priceSquareMeter: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  storageRooms: number;
  structureSurface: number;
  terraceSurface: number;
  patioSurface: number;
  totalSurface: number;
  accounts: IAccount[];
  category: string;
  company: string;
  owner: IClient;
}
