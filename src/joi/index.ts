import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';

export default (schema: Schema, property: 'body' | 'query' | 'params') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate({
        ...req.body,
        ...req.query,
        ...req.params,
      });

      const valid = error == null;

      if (valid) {
        return next();
      }

      const { details } = error;
      const message = details
        .map((i) => i.message)
        .toString()
        .replace(/"/g, '');

      return res.status(422).json({ message });
    } catch (e) {
      console.error('Validate error --->:', e);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };
};
