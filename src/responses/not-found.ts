import { BaseError } from "./base-response";

export class NotFoundError extends BaseError {
  constructor(message: string, code: string) {
    super(message);
    this.name = "Not Found";
    this.code = code || "UNKNOWN";
    this.status = global.httpStatus.NOT_FOUND;
    this.message = message || "Resouce not found";
  }
}
