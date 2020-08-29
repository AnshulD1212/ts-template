export class BaseError extends Error {
  code: string;
  message: string;
  status: number;
  details?: any
}
