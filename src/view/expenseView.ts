import { Router } from "express";
import { controlExpenseDelete, controlExpenseRegistration } from "../controller/expenseController";
import { verifyJWT } from "../middleware/token/jwtMiddleware";
import validateSchema from "../middleware/validateSchemaMiddleware";
import { registerExpenseSchema } from "../schema/expenseSchema";

const expenseRouter = Router();

expenseRouter.post("/expense/register", 
  verifyJWT,
  validateSchema(registerExpenseSchema),
  controlExpenseRegistration
)

expenseRouter.delete("/expense/delete",
  verifyJWT,
  controlExpenseDelete
)

export default expenseRouter;