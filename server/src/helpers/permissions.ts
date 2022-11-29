/* eslint-disable arrow-body-style */
export const isAllowed = (user: any, requiredPermission: string) => {
  return user?.role?.permissions?.includes(requiredPermission);
};
