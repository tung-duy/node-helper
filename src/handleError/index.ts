import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';

const defaultStatus = 404;
const defaultMessage = 'Route not found!';

export default async (error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("🚀 ~ errorHandler ~ error:", error);

  if (error) {
    const response = {
      message: get(error, 'message') || defaultMessage,
      details: get(error, 'details'),
      fe: get(error, 'fe'),
      code: get(error, 'statusCode') || get(error, 'code') || defaultStatus,
      url: get(req, 'originalUrl'),
      body: get(error, 'body'),
      query: get(error, 'query'),
    };

    if (response.message.includes('connect ECONNREFUSED')) {
      Object.assign(response, {
        details: 'Please check connection',
      });
    }

    if (process.env.NODE_ENV !== 'test') {
      console.log('\n-- errorHandler --\n', response);
    }

    res.status(response.code).send(response);
  }

  return next();
};
