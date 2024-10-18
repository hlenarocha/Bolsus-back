import { Router } from "express";
import validateSchema from "../middleware/validateSchemaMiddleware";
import { registerIncomeSchema } from "../schema/incomeSchema";


const incomeRouter = Router();

incomeRouter.post("/income/register", 
  validateSchema(registerIncomeSchema),

);

export default incomeRouter;