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

export async function deleteExpense(id: number, clientId: number) {
  await prisma.expense.delete({
    where: {
      id,
      clientId
    }
  });
}

export async function readExpense(clientId: number) {
  const result = await prisma.expense.findMany({
      where: {
        clientId,
      },
      include: {
        category: true,
      }
    })
  return result;
};