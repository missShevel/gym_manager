export default class ApiError extends Error {
  public status: number;

  public code: string;

  constructor({
    message = 'Internal Server Error',
    status = 500,
    code = 'INTERNAL_SERVER_ERROR',
  }) {
    super(message);

    this.status = status;
    this.code = code;
  }
}
