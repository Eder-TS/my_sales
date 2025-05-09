export default class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  // Inferência de tipo.
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
