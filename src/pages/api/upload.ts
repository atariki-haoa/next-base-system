import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import multer from 'multer';
// eslint-disable-next-line import/no-extraneous-dependencies
import FormData from 'form-data';

import { api } from '@/utils/axios';

const upload = multer({ dest: 'uploads/' });

export const config = {
  api: {
    bodyParser: false,
  },
};

interface NextApiRequestWithFile extends NextApiRequest {
  file: any;
}

export default async function uploadFile(
  request: NextApiRequestWithFile,
  response: NextApiResponse,
) {
  try {
    await new Promise<void>((resolve, reject) => {
      upload.single('file')(request as any, response as any, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const filePath = request.file.path;
    const fileStream = fs.createReadStream(filePath);
    const { authorization } = request.headers;
    const url = String(request.headers['x-request-api']);

    const form = new FormData();
    form.append('file', fileStream);

    const headers = {
      ...form.getHeaders(),
      Authorization: authorization as string,
    };

    await api.post(url, form, { headers });
    fs.unlinkSync(filePath);

    return response.status(200).json({ success: true });
  } catch (err: any) {
    return response.status(500).json({ error: err });
  }
}
