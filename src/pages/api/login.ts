import { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@/utils/axios';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { email, password } = req.body;

  try {
    const { data } = await api.post('login', { email, password });
    if (!data) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    res.status(200).json(data);
  } catch (error: any) {
    console.error('ERROR::::', error.response);
    if (error.response?.status === 404) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}
