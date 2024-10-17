import { Request, Response, NextFunction } from 'express';
import { hash } from "bcrypt";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();
const bcryptSync = Number(process.env.BCRYPT) | 8;

export async function controlRegistration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  
}