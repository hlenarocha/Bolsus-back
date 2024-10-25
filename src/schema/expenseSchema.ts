import joi from 'joi';

export const registerExpenseSchema = joi.object({
  title: joi.string().required(),
  date: joi.string().required().pattern(/^\d{4}-\d{2}-\d{2}$/), // verificar
  categoryId: joi.number().required(),
  value: joi.number().required(),
});