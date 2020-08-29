import { BaseError } from "./base-response";

export class UnProcessableEntityError extends BaseError {
  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = "Unprocessable Entity";
    this.code = code || "UNKNOWN";
    this.status = global.httpStatus.UNPROCESSABLE_ENTITY;
    this.message = message || "Bad Request";
    this.details = details || null;
  }
}
