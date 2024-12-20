import { Router } from 'express';
import validateSchema from '../middleware/validateSchemaMiddleware';
import { loginClientSchema, registerClientSchema } from '../schema/clientSchema';
import { controlClientInformation, controlClientLogin, controlClientRegistration } from '../controller/clientController';
import { generateJWT, verifyJWT } from '../middleware/token/jwtMiddleware';

const clientRouter = Router();

// next() --> todas as funções acima da última devem ter para passar para próxima função da fila

clientRouter.post("/client/register", // cadastro a cada login
  validateSchema(registerClientSchema), 
  controlClientRegistration,
);

clientRouter.post("/client/login", // geração de token a cada login
  validateSchema(loginClientSchema),
  generateJWT,
  controlClientLogin
);

clientRouter.get("/client/information",
  verifyJWT,
  controlClientInformation
);

export default clientRouter;