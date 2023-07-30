// models/Account.ts
import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo,
} from 'sequelize-typescript';
import State from './State';

@Table
class Account extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
    id!: number;

  @Column(DataType.STRING)
    category!: string;

  @Column(DataType.STRING)
    company!: string;

  @Column(DataType.STRING)
    clientNumber!: string;

  @ForeignKey(() => State)
  @Column(DataType.INTEGER)
    stateId!: number;

  @BelongsTo(() => State)
    state!: State;
}

export default Account;
