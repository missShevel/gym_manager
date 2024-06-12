import { File as FileDomain } from './file';

export interface Equipment {
  id: string;
  name: string;
  count: number;
  link: string;
  avatar?: FileDomain;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateEquipmentData {
  name: string;
  count: number;
  link: string;
  file?: File;
}

export interface IUpdateEquipmentData {
  id: string;
  name?: string;
  count?: number;
  link?: string;
  file?: File;
  fileId?: string;
}
