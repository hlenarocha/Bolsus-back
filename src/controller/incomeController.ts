import { Request, Response, NextFunction } from "express";
import { createIncome, deleteIncome, readIncome } from "../model/incomeModel";

export async function controlIncomeRegistration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const income = res.locals.body;
  const decoded = res.locals.client;

  try {
    await createIncome({
      categoryId: income.categoryId,
      clientId:  decoded.id,
      title: income.title,
      date: new Date(income.date),
      value: income.value,
    });

    res.status(200).send({ message: "Sucesso ao cadastrar receita!" });

  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Erro ao cadastrar receita!" });
    
  }
}

export async function controlIncomeDelete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  const decoded = res.locals.client;

  try {
    await deleteIncome(Number(id), decoded.id);

    res.status(200).send( { message: "Sucesso ao deletar entrada! "} );

  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Erro ao deletar entrada!"});
  }
}

export async function controlIncomeRetrieve(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const decoded = res.locals.client;

  try {
    const result = await readIncome(decoded.id);

    res.status(200).send(result);
    
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Erro ao pegar informações das entradas! "})
  }
}