import { BaseError } from "./base-response";

export class BadRequestError extends BaseError {
  constructor(message: string, code: string) {
    super(message);
    this.name = "Bad Request";
    this.code = code || "UNKNOWN";
    this.status = global.httpStatus.BAD_REQUEST;
    this.message = message || "Bad Request";
  }
}
