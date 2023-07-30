// auth.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import users from '../../../mock/users.json'
import roles from '../../../mock/roles.json'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body

  const user = users.data.find(user => user.email === email);

  if (!user || user.password !== password) {
    res.status(401).json({ message: 'Invalid email or password' })
    return
  }
  const role = roles.data.find(role => role.roleId === user.roleId)
  const token = jwt.sign({ userId: user.userId, roleId: user.roleId }, 'your-secret-key')
  res.status(200).json({ 
      ...user,
      token,
      ...role
   })
}
