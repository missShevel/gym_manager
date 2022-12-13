import { File } from './file';
import { Role } from './role';

export interface User {
    id: string;
    firstName: string;
    lastName: number;
    email: string;
    sex: string;
    passwordHash: string;
    avatar: File | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISignInData {
    email: string;
    password: string;
}
