export interface IErrorCode {
  [key: string]: { code: string; message: string };
}

export const errorCodes: IErrorCode = {
  BAD_REQUEST: { code: "ER400", message: "Bad Request" },
  NOT_FOUND: { code: "ER404", message: "Resource not found" },
  RESOURCE_ALREADY_EXIST: { code: "ER603", message: "Resource already exist" },
};
