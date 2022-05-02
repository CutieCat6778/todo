import { compare, hash } from "bcrypt";

export async function AuthenticateUser(hash: string, password: string): Promise<boolean> {
  const isMatching = await compare(password, hash);

  return isMatching;
}

export async function HashPassword(password: string): Promise<string> {
  return hash(password, 10);
}