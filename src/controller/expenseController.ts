import { Request, Response, NextFunction } from "express";
import { createExpense, deleteExpense, readExpense } from "../model/expenseModel";

export async function controlExpenseRegistration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const expense = res.locals.body;
  const decoded = res.locals.client;

  try {
    await createExpense({
      categoryId: expense.categoryId,
      clientId:  decoded.id,
      title: expense.title,
      date: new Date(expense.date),
      value: expense.value,
    });

    res.status(200).send( { message: "Sucesso ao cadastrar despesa! "} );

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

    res.status(200).send( { message: "Sucesso ao cadastrar despesa! "} );

  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Erro ao deletar despesa!"});
  }
}

export async function controlExpenseRetrieve(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const decoded = res.locals.client;

  try {
    const result = await readExpense(decoded.id);

    res.status(200).send(result);
    
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Erro ao pegar informações das despesas! "})
  }

}