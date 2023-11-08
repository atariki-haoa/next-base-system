import type { NextApiRequest, NextApiResponse } from 'next';
import sequelize from '../../../../config/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const { id } = req.query; // El ID se obtiene de req.query
  const StateModel = sequelize.models.State;
  const ClientModel = sequelize.models.Client;
  const AddressModel = sequelize.models.Address;
  const BankAccountModel = sequelize.models.BankAccount;
  const PhoneNumberModel = sequelize.models.PhoneNumber;
  const AccountModel = sequelize.models.Account;

  switch (method) {
    case 'GET': {
      // Handle GET request
      const data = await StateModel.findOne({
        where: { id },
        include: [
          {
            model: ClientModel,
            as: 'owner',
            include: [
              { model: AddressModel, as: 'address' },
              { model: BankAccountModel, as: 'bankAccount' },
              { model: PhoneNumberModel, as: 'phoneNumber' },
            ],
          },
          { model: ClientModel, as: 'tenant' },
          { model: AccountModel, as: 'accounts' },
        ],
      });
      res.status(200).json(data);
      break;
    }
    case 'DELETE': {
      // Handle DELETE request
      const deletedState = await StateModel.destroy({
        where: { id },
      });

      if (deletedState) {
        res.status(200).json({ message: 'State deleted' });
      } else {
        res.status(404).json({ message: 'State not found' });
      }
      break;
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
