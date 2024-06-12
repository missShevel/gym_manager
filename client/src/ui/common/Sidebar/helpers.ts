import { User } from 'domains';
import { TSidebatItem } from './constants';

export const sidebarPermissionFilter = (user: User) => (item: TSidebatItem) => {
  if (!user) return false;
  const userPermissions = user.role.permissions;
  const neededPermissions = item.viewPermission;

  return neededPermissions.some((permission) => userPermissions.includes(permission));
};
