export const errorMapper = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Not found error, please try again',
  PERMISSION_DENIED: 'Permission denied',
  FILE_NOT_FOUND: 'File was not found',
  CLIENT_NOT_FOUND: 'Client was not found',
  EQUIPMENT_NOT_FOUND: 'Equipment was not found',
  USER_NOT_FOUND: 'User was not found',
  TRAINER_NOT_FOUND: 'Trainer was not found',
  FILE_NOT_PROVIDED: 'File was not provided',
  FILE_NOT_UPLOADED: 'File was not uploaded',
  NOT_AUTHORIZED: 'Not authorized',
  USER_EXISTS: 'User with with credentials already exists',
  USER_NOT_EXISTS: 'User with with credentials doesn`t exist',
  WRONG_PASSWORD: 'Wrong password',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
};

// eslint-disable-next-line max-len
export const mapErrorByCode = (code: string = 'INTERNAL_SERVER_ERROR') =>
  errorMapper[code] || errorMapper.INTERNAL_SERVER_ERROR;
