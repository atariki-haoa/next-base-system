import type { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@/utils/axios';

export const config = {
  api: {
    bodyParser: false, // Desactivar el analizador de cuerpo de solicitud predeterminado de Next.js
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const { url } = query;
  let fixUrl = '';
  if (Array.isArray(url)) {
    [fixUrl] = url;
  } else {
    fixUrl = url || '';
  }
  if (!fixUrl) {
    return res.status(404).json({
      message: 'Not found',
    });
  }

  const finalUrl = fixUrl.split(';').join('/');

  let response = '';
  try {
    switch (method) {
      case 'GET':
        response = await api.get(finalUrl);
        break;
      case 'POST':
        response = await api.post(finalUrl);
        break;
      case 'PUT':
        response = await api.put(finalUrl, body);
        break;
      case 'DELETE':
        response = await api.delete(finalUrl);
        break;
      default:
        return res.status(400).json({
          message: 'Bad request',
        });
    }
    return res.status(200).json(response);
  } catch (err: any) {
    return res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
}
