import { prisma } from "../db/connection";

interface Client {
  id: number;
  name: string;
  email: string;
  password: string;
}

export async function createClient({name, email, password}: Omit<Client, "id">) {
  await prisma.client.create({
    data: {
      name,
      email,
      password
    }
  });
}

export async function readClientByEmail(email: string) {
  const client = await prisma.client.findFirst({
    where: { 
      email
    },
  
  });

  return client;
}

export async function readClientById(id: number) {
  const client = await prisma.client.findUnique({
    where: { 
      id: id
    },
  })

  return client;
}

export async function deleteClientById(id: number) {
  await prisma.client.delete({
    where: {
      id,
    }
  })
}