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

    const clientId = readClientByEmail(client.email);
  
    if (!clientId) {
      return res.status(404).send({ message: "Client not found "});
    }

    jwt.sign(clientId, secretKey, { expiresIn: '168h' })

  } catch (err) {
    return res.status(500).send({ message: "Error generating JWT" });
  }
}

export async function verifyJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "");

  if (!token) {
    return res.status(401).send({ error: "Token doesn't exist" });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { id: number };
    res.locals.client = decoded;

    const verify = await readClientById(decoded.id);

    if(!verify) {
      return res.status(404).send({ message: "Client not found"});
    } 
    next();
  } catch (error) {
    return res.status(401).send({ error: "Unauthorized" });
  }
}