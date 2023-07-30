// owner.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import owners from '../../../mock/owners.json'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET': {
      // Handle GET request
      res.status(200).json(owners)
      break
    }
    case 'POST': {
      // Handle POST request
      const newOwner = req.body
      owners.data.push(newOwner)
      res.status(200).json(newOwner)
      break
    }
    case 'PUT': {
      // Handle PUT request
      const updatedOwner = req.body
      const index = owners.data.findIndex((owner: any) => owner.id === updatedOwner.id)
      if (index > -1) {
        owners.data[index] = updatedOwner
        res.status(200).json(updatedOwner)
      } else {
        res.status(404).json({ message: 'Owner not found' })
      }
      break
    }
    case 'DELETE': {
      // Handle DELETE request
      const { id } = req.body
      const ownerIndex = owners.data.findIndex((owner: any) => owner.id === id)
      if (ownerIndex > -1) {
        const deletedOwner = owners.data.splice(ownerIndex, 1)
        res.status(200).json(deletedOwner)
      } else {
        res.status(404).json({ message: 'Owner not found' })
      }
      break
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  }
}
