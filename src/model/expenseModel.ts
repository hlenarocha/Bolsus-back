import  { prisma } from "../db/connection";

interface Expense {
  id: number;
  categoryId: number;
  clientId: number;
  title: string;
  date: Date;
  value: number;
}

export async function createExpense({ categoryId, clientId, title, date, value }: Omit<Expense, "id">) {
  await prisma.expense.create({
    data: {
      categoryId,
      clientId,
      title,
      date,
      value,
    },
  });
}
