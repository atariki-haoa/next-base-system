import { NextApiRequest, NextApiResponse } from 'next';
import { api } from '@/utils/axios';

export default async function downloadFile(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const { authorization } = request.headers;
    const url = String(request.headers['x-request-api']);
    const res = await api.get(url, {
      responseType: 'stream',
      headers: {
        Authorization: authorization as string,
      },
    });

    response.setHeader('Content-Type', 'application/octet-stream');
    response.setHeader('Content-Disposition', 'attachment; filename=archivo-descargado.txt');

    res.data.pipe(response);
  } catch (err: any) {
    console.error(err.response?.data);
    response.status(500).json({ error: 'Error al descargar el archivo' });
  }
}
