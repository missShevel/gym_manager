import { File } from './file';
import { User } from './user';

export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    sex: string;
    status: string;
    details: string;
    avatar: File | null;
    trainer: User | null;
    createdAt: Date;
    updatedAt: Date;
}
