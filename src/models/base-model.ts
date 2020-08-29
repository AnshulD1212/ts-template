import { logger, Logger } from "../settings/logger";
import { knex, Knex } from "../settings/datastore";
import { errorCodes, IErrorCode } from "../settings/error-codes";

const pgErrorCodes: { [key: string]: string } = {
  UNIQUE_CONSTRAINT_VIOLATION: "23505",
};

/**
 * Base Model interface define the structure for all the DB models
 *
 * @interface IBaseModel
 */
interface IBaseModel {
  readonly logger: Logger;
  readonly knex: Knex;
  readonly errorCodes: IErrorCode;
  isDuplicateRow(error: any): boolean;
  generateLimitAndOffset(
    pageSize: number,
    page: number
  ): { limit: number; offset: number };
}

/**
 * Base Model class will be inherited by all the model used in the project where base will provide default utility implementation
 *
 * @export
 * @class BaseModel
 * @implements {IBaseModel}
 */
export class BaseModel implements IBaseModel {
  logger: Logger;
  knex: Knex;
  errorCodes: IErrorCode;
  constructor() {
    this.logger = logger;
    this.knex = knex;
    this.errorCodes = errorCodes;
  }

  /**
   * Function to validate the error is caused due to unique constrain violation
   *
   * @param {*} error
   * @return {*}  {boolean}
   * @memberof BaseModel
   */
  isDuplicateRow(error: any): boolean {
    if (error.code === pgErrorCodes.UNIQUE_CONSTRAINT_VIOLATION) {
      return true;
    }
    return false;
  }

  /**
   * Default implementation for get paginated request
   *
   * @param {number} pageSize
   * @param {number} page
   * @return {*}  {{ limit: number, offset: number }}
   * @memberof BaseModel
   */
  generateLimitAndOffset(
    pageSize: number,
    page: number
  ): { limit: number; offset: number } {
    return {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    };
  }
}
