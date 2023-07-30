import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { rut } = req.query;

  if (!rut) {
    return res.status(400).json({ error: 'Se requiere un parámetro de rut.' });
  }

  try {
    const response = await axios.get(`https://api.libreapi.cl/rut/validate?rut=${rut}`);

    // Si la respuesta es exitosa, devolvemos los datos
    if (response.data.status === 'success') {
      return res.status(200).json(response.data);
    }

    // Si la respuesta no es exitosa, devolvemos el mensaje de error
    return res.status(400).json({ error: response.data.message });
  } catch (error) {
    return res.status(500).json({ error: 'Hubo un error al validar el rut.' });
  }
}
