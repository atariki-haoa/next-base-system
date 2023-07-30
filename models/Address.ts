// models/Address.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Client from './Client';

@Table
class Address extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column(DataType.STRING)
  street!: string;

  @Column(DataType.STRING)
  streetNumber!: string;

  @Column(DataType.STRING)
  commune!: string;

  @Column(DataType.STRING)
  region!: string;

  @Column(DataType.STRING)
  apartment!: string;

  @Column(DataType.STRING)
  extra!: string;

  @ForeignKey(() => Client)
  @Column(DataType.INTEGER)
  clientId!: number;

  @BelongsTo(() => Client)
  client!: Client;
}

export default Address;
