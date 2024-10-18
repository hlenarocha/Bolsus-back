import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export default function validateSchema(schema: ObjectSchema) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const request = req;
    const { body } = request;

    const valid = schema.validate(body);

    if (valid.error) {
      res.status(422).send(valid.error.details);
      return;
    }

    res.locals.body = body; // boa prática armazenar req no res.locals.body. Ele é um armazenamento local da req no back-end.
    next();
  };
}