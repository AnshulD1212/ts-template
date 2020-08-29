import Ajv from "ajv";

import { UnProcessableEntityError } from "../responses";
import { errorCodes } from "../settings/error-codes";

export class ValidationModule {
  private static readonly ajv: Ajv.Ajv = new Ajv();

  static validateJSONSchema<T>(schema: object, data: T): T {
    const isValid = this.ajv.validate(schema, data);
    if (!isValid) {
      throw new UnProcessableEntityError(errorCodes.SETTING_KEY_VALIDATION_RULE_FAILED.message, errorCodes.SETTING_KEY_VALIDATION_RULE_FAILED.code, this.ajv.errorsText());
    }
    return data;
  }

  static isJSONSchemaValid<T extends object>(schema: T): boolean {
    try {
      this.ajv.compile(schema);
      return true;
    } catch (e) {
      return false;
    }
  }
}
