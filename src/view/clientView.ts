import { Router } from 'express';
import validateSchema from '../middleware/validateSchemaMiddleware';
import { registerClientSchema } from '../schema/clientSchema';
import { controlRegistration } from '../controller/clientController';

const clientRouter = Router();

clientRouter.post("/client/register", 
  validateSchema(registerClientSchema), 
  controlRegistration
);

export default clientRouter;