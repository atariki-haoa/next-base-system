// models/State.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import Client from './Client';
import Account from './Account';

@Table
class State extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
    id!: number;

  @Column(DataType.STRING)
    propertyType!: string;

  @Column(DataType.STRING)
    rol!: string;

  @Column(DataType.STRING)
    street!: string;

  @Column(DataType.STRING)
    number!: string;

  @Column(DataType.STRING)
    block!: string;

  @Column(DataType.STRING)
    region!: string;

  @Column(DataType.STRING)
    commune!: string;

  @Column(DataType.FLOAT)
    price!: number;

  @Column(DataType.FLOAT)
    priceSquareMeter!: number;

  @Column(DataType.INTEGER)
    bedrooms!: number;

  @Column(DataType.INTEGER)
    bathrooms!: number;

  @Column(DataType.INTEGER)
    parkingSpaces!: number;

  @Column(DataType.INTEGER)
    storageRooms!: number;

  @Column(DataType.FLOAT)
    structureSurface!: number;

  @Column(DataType.FLOAT)
    terraceSurface!: number;

  @Column(DataType.FLOAT)
    patioSurface!: number;

  @Column(DataType.FLOAT)
    totalSurface!: number;

  @Column(DataType.STRING)
    category!: string;

  @Column(DataType.STRING)
    company!: string;

  @Column(DataType.STRING)
    clientNumber!: string;

  @HasMany(() => Account)
    accounts!: Account[];

  @Column({
    type: DataType.STRING,
    defaultValue: 'INGRESADA',
  })
    status!: string;

  @ForeignKey(() => Client)
  @Column(DataType.INTEGER)
    clientId!: number;

  @BelongsTo(() => Client, 'ownerId')
    owner!: Client;

  @ForeignKey(() => Client)
  @Column(DataType.INTEGER)
    tenantId!: number;

  @BelongsTo(() => Client, 'tenantId')
    tenant!: Client;
}

export default State;
