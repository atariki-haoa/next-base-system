// models/Client.ts
import { Table, Column, Model, ForeignKey, BelongsTo, HasOne, HasMany, DataType } from 'sequelize-typescript';
import State from './State';
import PhoneNumber from './PhoneNumber';
import Address from './Address';
import BankAccount from './BankAccount';

@Table
class Client extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column(DataType.STRING)
  firstName!: string;

  @Column(DataType.STRING)
  lastName!: string;

  @Column(DataType.STRING)
  secondLastName!: string;

  @Column(DataType.STRING)
  mail!: string;

  @Column(DataType.STRING)
  rut!: string;

  @Column(DataType.DATEONLY)
  birthdate!: string;

  @Column(DataType.STRING)
  notes!: string;

  @ForeignKey(() => State)
  @Column(DataType.INTEGER)
  stateId!: number;

  @BelongsTo(() => State)
  state!: State;

  @HasMany(() => PhoneNumber)
  phoneNumber!: PhoneNumber[];

  @ForeignKey(() => Address)
  @Column(DataType.INTEGER)
  addressId!: number;

  @HasOne(() => Address)
  address!: Address;

  @HasMany(() => BankAccount)
  bankAccount!: BankAccount[];

}

export default Client;
