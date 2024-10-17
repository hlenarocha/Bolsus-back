import { prisma } from "../db/connection";

interface Client {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function createClient({name, email, password}: Omit<Client, "id">) {
  const client = await prisma.client.create({
    data: {
      name,
      email,
      password
    }
  });

  return client;
}

export async function readClientByEmail(email: string) {
  const client = await prisma.client.findFirst({
    where: { 
      email
    },
    select: {
      id: true // só seleciona id
    }
  });

  return client?.id;
}

export async function readClientById(id: number) {
  const client = await prisma.client.findUnique({
    where: { 
      id 
    },
  })

  return client;
}