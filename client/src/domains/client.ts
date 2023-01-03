import { File as FileDomain } from './file';
import { User } from './user';

export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    sex: string;
    status: string;
    details: string;
    avatar?: FileDomain;
    trainer: User | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateClientData {
    firstName: string;
    lastName: string;
    sex: string;
    status: string;
    details: string;
    file?: File;
    trainer?: User;
}

export interface IUpdateClientData {
    id: string;
    firstName?: string;
    lastName?: string;
    sex?: string;
    status?: string;
    details?: string;
    file?: File;
    fileId?: string;
    trainer?: User;
}
