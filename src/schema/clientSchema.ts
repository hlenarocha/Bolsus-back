import joi from 'joi';

export const registerClientSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required,
  password: joi.string().required()
});

export const loginClientSchema = joi.object({
  email: joi.string().email().required,
  password: joi.string().required()
});

