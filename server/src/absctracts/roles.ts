export enum Roles {
  ADMINISTRATOR = 'ADMINISTRATOR',
  MANAGER = 'MANAGER',
  TRAINER = 'TRAINER',
}

export const ROLES = [Roles.ADMINISTRATOR, Roles.MANAGER, Roles.TRAINER];

export const RolePermissions = {
  MANAGER: {
    add: 'add_managers',
    view: 'view_managers',
    edit: 'edit_managers',
    remove: 'remove_managers',
  },
  TRAINER: {
    add: 'add_trainer',
    view: 'view_trainer',
    edit: 'edit_trainer',
    remove: 'remove_trainer',
  },
};

export type TRolePermissions = typeof RolePermissions;
