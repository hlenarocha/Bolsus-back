import { Request, Response, NextFunction } from "express";
import { createIncome, deleteIncome } from "../model/incomeModel";

export async function controlIncomeRegistration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const income = res.locals.body;

  try {
    await createIncome({
      categoryId: income.categoryId,
      clientId:  income.clientId,
      title: income.title,
      date: income.date,
      value: income.value,
    });

  } catch (error) {
    res.status(400).send({ message: "Erro ao cadastrar receita!" });
  }
}

export async function controlIncomeDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const income = res.locals.body;

  try {
    await deleteIncome(income.id);

  } catch (error) {
    res.status(400).send({ message: "Erro ao deletar receita!"});
  }

}