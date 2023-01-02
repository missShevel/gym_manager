export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export type ROLES = 'MANAGER' | 'TRAINER';
