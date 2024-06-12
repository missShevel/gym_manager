export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export type ROLES = 'MANAGER' | 'TRAINER';
export const beautifyRole = (role: ROLES) => (role === 'MANAGER' ? 'Manager' : 'Trainer');
