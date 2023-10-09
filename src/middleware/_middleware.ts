import { NextResponse, NextRequest } from 'next/server';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  origin: '*', // or specify your origin
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
});

// eslint-disable-next-line @typescript-eslint/ban-types
function runMiddleware(req: NextRequest, res: NextResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function middleware(req: NextRequest, res: NextResponse) {
  await runMiddleware(req, res, cors);

  return NextResponse.next();
}
