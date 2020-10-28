export class ResponseError extends Error {
  status: number;
  constructor(message: string, status: number = 200) {
    super(message);
    this.status = status;
  }
}
