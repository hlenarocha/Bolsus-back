import { Router } from "express";
import validateSchema from "../middleware/validateSchemaMiddleware";
import { registerIncomeSchema } from "../schema/incomeSchema";
import { controlIncomeDelete, controlIncomeRegistration } from "../controller/incomeController";


const incomeRouter = Router();

incomeRouter.post("/income/register", 
  validateSchema(registerIncomeSchema),
  controlIncomeRegistration
);

incomeRouter.delete("/income/delete",
  controlIncomeDelete
);

export default incomeRouter;