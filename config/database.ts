import { Sequelize } from 'sequelize-typescript';
import config from './config';
import State from '../models/State';
import Address from '../models/Address';
import Account from '../models/Account';
import PhoneNumber from '../models/PhoneNumber';
import BankAccount from '../models/BankAccount';
import Client from '../models/Client';

const { database, username, password } = config.development;

const sequelize = new Sequelize(database, username, password, { dialect: 'postgres' });

// Define el modelo State en sequelize
sequelize.addModels([State, Address, Account, PhoneNumber, BankAccount, Client]);

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log('Database & tables created!');
//   });

export default sequelize;