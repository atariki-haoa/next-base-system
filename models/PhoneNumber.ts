// models/PhoneNumber.ts
import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo,
} from 'sequelize-typescript';
import Client from './Client';

@Table
class PhoneNumber extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
    id!: number;

  @Column(DataType.STRING)
    prefix!: string;

  @Column(DataType.STRING)
    number!: string;

  @ForeignKey(() => Client)
  @Column(DataType.INTEGER)
    clientId!: number;

  @BelongsTo(() => Client)
    client!: Client;
}

export default PhoneNumber;
