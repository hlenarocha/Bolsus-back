import { prisma } from "../db/connection";

async function seed() {
  
  const categories = [
    // Categorias de Receitas
    { title: 'Salário', color: '#4CAF50', isExpense: false },
    { title: 'Renda Extra', color: '#FF9800', isExpense: false },
    { title: 'Investimento', color: '#00BCD4', isExpense: false },
    { title: 'Venda', color: '#3F51B5', isExpense: false },
    { title: 'Prêmio', color: '#9C27B0', isExpense: false },

    // Categorias de Despesas
    { title: 'Alimentação', color: '#F44336', isExpense: true },
    { title: 'Moradia', color: '#2196F3', isExpense: true },
    { title: 'Vestuário', color: '#E91E63', isExpense: true },
    { title: 'Serviço', color: '#607D8B', isExpense: true },
    { title: 'Lazer', color: '#FFC107', isExpense: true },
    { title: 'Saúde', color: '#8BC34A', isExpense: true },
    { title: 'Transporte', color: '#FFEB3B', isExpense: true },
    { title: 'Educação', color: '#795548', isExpense: true },
    { title: 'Pets', color: '#FF5722', isExpense: true }
  ];

  await prisma.category.createMany({
    data: categories,
  });
}

seed()
    .catch((e) => {
      console.error(e);
    })
    .finally(async() => {
      await prisma.$disconnect();
      console.log("Success seed!")
    });