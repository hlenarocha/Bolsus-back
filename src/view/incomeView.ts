import { Router } from "express";
import validateSchema from "../middleware/validateSchemaMiddleware";
import { registerIncomeSchema } from "../schema/incomeSchema";
import { controlIncomeDelete, controlIncomeRegistration } from "../controller/incomeController";
import { verifyJWT } from "../middleware/token/jwtMiddleware";


const incomeRouter = Router();

incomeRouter.post("/income/register", 
  verifyJWT,
  validateSchema(registerIncomeSchema),
  controlIncomeRegistration
);

incomeRouter.delete("/income/delete",
  verifyJWT,
  controlIncomeDelete
);

export default incomeRouter;