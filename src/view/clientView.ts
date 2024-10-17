import { Router } from 'express';
import { PrismaClient } from "@prisma/client";

const clientRouter = Router();
const prisma = new PrismaClient();

clientRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try { 
    const client = await prisma.client.create({
      data: { name, email, password }
    });
    res.status(201).send(client);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default clientRouter;