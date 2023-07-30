// models/BankAccount.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Client from './Client';

@Table
class BankAccount extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  fullName!: string;

  @Column(DataType.STRING)
  mail!: string;

  @Column(DataType.STRING)
  taxId!: string;

  @Column(DataType.STRING)
  accountNumber!: string;

  @Column(DataType.STRING)
  accountType!: string;

  @Column(DataType.STRING)
  bank!: string;

  @ForeignKey(() => Client)
  @Column(DataType.INTEGER)
  clientId!: number;

  @BelongsTo(() => Client)
  client!: Client;
}

export default BankAccount;
