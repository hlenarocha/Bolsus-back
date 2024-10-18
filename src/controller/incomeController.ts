import { Request, Response, NextFunction } from "express";
import { createIncome } from "../model/incomeModel";

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