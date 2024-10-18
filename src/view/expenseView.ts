import { Router } from "express";
import { controlExpenseDelete, controlExpenseRegistration } from "../controller/expenseController";

const expenseRouter = Router();

expenseRouter.post("/expense/register", 
  controlExpenseRegistration
)

expenseRouter.delete("/expense/delete",
  controlExpenseDelete
)

export default expenseRouter;