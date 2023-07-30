// states.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '../../../../config/database';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const StateModel = sequelize.models.State;
  const ClientModel = sequelize.models.Client;
  const AddressModel = sequelize.models.Address;
  const BankAccountModel = sequelize.models.BankAccount;
  const PhoneNumberModel = sequelize.models.PhoneNumber;
  const AccountModel = sequelize.models.Account;
  
  switch (method) {
    case 'GET': {
      // Handle GET request
      const instances = await StateModel.findAll({
        include: [
          { model: ClientModel, as: 'owner' },
          { model: ClientModel, as: 'tenant' }
        ]
      });
      const data = instances.map(instance => instance.get({ plain: true }));
      res.status(200).json(data);
      break;
    }
    case 'POST': {
      const { owner, accounts, ...state } = req.body;
      const { address, bankAccount, phoneNumber } = owner;
      
      const newAddress = await AddressModel.create(address);

      const newOwner = await ClientModel.create({
        ...owner,
        addressId: newAddress.dataValues.id,
      });

      await BankAccountModel.create({
        ...bankAccount,
        clientId: newOwner.dataValues.id,
      });
      await PhoneNumberModel.create({
        ...phoneNumber,
        clientId: newOwner.dataValues.id,
      });

      const newState = await StateModel.create({
        ...state, 
        ownerId: newOwner.dataValues.id,
      });

      for (const account of accounts) {
        await AccountModel.create({
          ...account,
          stateId: newState.dataValues.id,
        });
      }
            
      res.status(200).json(newState);
      break;
    }
    case 'PUT': {
      // Handle PUT request
      const { id } = req.body;
      const updatedState = await StateModel.update(req.body, {
        where: { id: id }
      });
      
      if (updatedState[0]) { // If the update is successful, Sequelize returns the number of affected rows
        res.status(200).json(req.body);
      } else {
        res.status(404).json({ message: 'State not found' })
      }
      break;
    }
    case 'DELETE': {
      // Handle DELETE request
      const { id } = req.body;
      const deletedState = await StateModel.destroy({
        where: { id: id }
      });

      if (deletedState) { // If the deletion is successful, Sequelize returns the number of affected rows
        res.status(200).json({ message: 'State deleted' });
      } else {
        res.status(404).json({ message: 'State not found' })
      }
      break;
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
}
