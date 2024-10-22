import { Request, Response, NextFunction } from "express";
import { createExpense, deleteExpense } from "../model/expenseModel";

export async function controlExpenseRegistration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const expense = res.locals.body;

  try {
    await createExpense({
      categoryId: expense.categoryId,
      clientId:  expense.clientId,
      title: expense.title,
      date: expense.date,
      value: expense.value,
    });

  } catch (error) {
    res.status(400).send({ message: "Erro ao cadastrar despesa!" });
  }
}

export async function controlExpenseDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const expense = res.locals.body;

  try {
    await deleteExpense(expense.id);
  } catch (error) {
    res.status(400).send({ message: "Erro ao deletar receita!"});
  }
}