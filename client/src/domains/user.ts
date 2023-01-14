import { File as FileDomain } from './file';
import { Role } from './role';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  passwordHash: string;
  avatar?: FileDomain;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface ICreateUserData {
  firstName: string;
  lastName: number;
  email: string;
  sex: string;
  password: string;
  file?: File;
  role: Role;
}

export interface IUpdateUserData {
  id: string;
  firstName?: string;
  lastName?: number;
  email?: string;
  sex?: string;
  password?: string;
  file?: File;
  fileId?: string;
}

export const beautifyTrainer = (trainer: User | null) =>
  trainer ? `${trainer.firstName} ${trainer.lastName}` : '-';
