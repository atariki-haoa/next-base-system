import { IAddress } from './Address';
import { IBankAccount } from './BankAccount';
import { IPhoneNumber } from './PhoneNumber';

export interface IClient {
  firstName: string;
  lastName: string;
  secondLastName: string;
  mail: string;
  rut: string;
  taxId: string;
  birthdate: string;
  notes: string;
  address: IAddress;
  phoneNumber: IPhoneNumber;
  bankAccount: IBankAccount;
}
