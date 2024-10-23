import { Request, Response, NextFunction } from 'express';
import { hash } from "bcrypt";
import dotenv from 'dotenv';
import { createClient, readClientByEmail, readClientById } from '../model/clientModel';
import bcrypt from "bcrypt";

dotenv.config();
const bcryptSync = Number(process.env.BCRYPT) || 8;

export async function controlClientRegistration(
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

export async function controlClientLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const client = res.locals.body;

  try {
    const findClient = await readClientByEmail(client.email);

    if (!findClient) {
      res.status(400).send({ error: "E-mail não cadastrado!"});
      return;
    }

    const isMatch = await bcrypt.compare(client.password, findClient.password);

    if (!isMatch) {
      res.status(401).send({ error: "Senha incorreta!"});
      return;
    }
    
    res.status(200).send({ token: res.locals.token }); // mandando token armazenado no locals na response
     
  } catch (error) {
    res.status(500).send(error);
    return;
  }
}

export async function controlClientInformation(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const client = res.locals.client;

  if (isNaN(client.id) || client.id <= 0) {
    res.status(400).send({ message: 'Invalid ID'});
    return;
  }

  try {
    const clientInformation = await readClientById(client.id);
    
    if (!clientInformation) {
      res.status(404).send({ error: "Client not found!"});
      return;
    }

    res.status(200).send(clientInformation);
  } catch (error) {
    res.status(500).send(error);
  }

}