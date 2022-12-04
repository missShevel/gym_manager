export default class ApiError extends Error {
  constructor(message = 'Internal Server Error', public status: number = 500) {
    super(message);

    this.status = status;
  }
}
