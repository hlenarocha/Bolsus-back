import { Request, Response, NextFunction } from 'express';
import { hash } from "bcrypt";
import dotenv from 'dotenv';
import { createClient, readClientByEmail } from '../model/clientModel';

dotenv.config();
const bcryptSync = Number(process.env.BCRYPT) || 8;

export async function controlRegistration(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const data = res.locals.body;

  try {
    const findClient = await readClientByEmail(data.email);

    if (findClient) {
      res.status(400).send({ error: "Conta já cadastrada!"});
      return;
    }

    const hashedPassword = await hash(data.password, bcryptSync); 
      
    await createClient ({
      name: data.name,
      email: data.email,
      password: hashedPassword
    });

    res.status(201).send({ message: "Sucesso no cadastro!"});
    
  } catch(error) {
    res.status(500).send({ error: "Erro ao cadastrar cliente!"});
  }

}