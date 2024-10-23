import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { readClientByEmail, readClientById } from "../../model/clientModel";

dotenv.config();

const secretKey = process.env.JWT_SECRET || "bolsus";

if (!secretKey) {
  throw new Error("JWT_SECRET is not defined");
}

export async function generateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {

  try {
    const client = req.body as { email: string };

    const clientInformation =  await readClientByEmail(client.email);
  
    if (!clientInformation) {
      res.status(404).send({ message: "Client not found "});
      return;
    }

    const token = jwt.sign({ id: clientInformation.id }, secretKey, { expiresIn: '168h' });

    res.locals.token = token;
    next();


  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error generating JWT" });
    return;
  }
}

export async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send({ error: "Token doesn't exist" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { id: number };
    res.locals.client = decoded;

    console.log(decoded.id);

    const verify = await readClientById(decoded.id);

    if(!verify) {
      res.status(404).send({ message: "Client not found"});
      return;
    } 

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Unauthorized" });
    return;
  }
}