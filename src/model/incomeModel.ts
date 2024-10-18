import  { prisma } from "../db/connection";

interface Income {
  id: number;
  categoryId: number;
  clientId: number;
  title: string;
  date: Date;
  value: number;
}

export async function createIncome({ categoryId, clientId, title, date, value }: Omit<Income, "id">) {
  await prisma.income.create({
    data: {
      categoryId,
      clientId,
      title,
      date,
      value,
    },
  });
}

export async function deleteIncome(id: number) {
  await prisma.income.delete({
    where: {
      id,
    }
  });
}