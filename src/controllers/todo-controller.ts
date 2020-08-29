import { Request, Response, NextFunction } from "express";
import * as joi from "@hapi/joi";

import { BaseController } from "./base-controller";
import { POST, GET, PATCH, DELETE } from "../routes/decorators";
import { BadRequestError, NotFoundError } from "../responses";
import { errorCodes } from "../settings/error-codes";

import { TodoModel, ITodo } from "../models/todo-model";
import { ValidationModule } from "../modules/validation-module";

const postSchema: joi.Schema = joi.object().keys({
  app_id: joi.string().uuid().required(),
  setting_key: joi.string().required(),
  description: joi.string().required(),
  validation_rule: joi.object().required(),
});

const patchSchema: joi.Schema = joi
  .object()
  .keys({
    setting_key: joi.string().optional(),
    description: joi.string().optional(),
    validation_rule: joi.object().optional(),
  })
  .or("setting_key", "description", "validation_rule");

const todoModel: TodoModel = new TodoModel();

export class TodoController extends BaseController {
  @POST({ endpoint: "/v1/todo" })
  async createSettingType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any>> {
    try {
      const body = await postSchema.validateAsync(req.body);
      const isValidationRuleValid: boolean = ValidationModule.isJSONSchemaValid(
        body.validation_rule
      );
      if (!isValidationRuleValid) {
        throw new BadRequestError(
          "Invalid validation_rule",
          errorCodes.BAD_REQUEST.code
        );
      }
      await todoModel.create({
        todo: body.todo,
        status: body.status,
        is_deleted: false,
      });
      return res.status(global.httpStatus.CREATED).send();
    } catch (e) {
      next(e);
    }
  }

  @GET({ endpoint: "/v1/todo" })
  async getSettingType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any>> {
    try {
      const body = await joi
        .object()
        .keys({ app_id: joi.string().uuid().required() })
        .validateAsync(req.query);
      const result = await todoModel.fetchByAppId(body.app_id);
      if (!result.length) {
        throw new NotFoundError(
          errorCodes.NOT_FOUND.message,
          errorCodes.NOT_FOUND.code
        );
      }
      return res.status(global.httpStatus.OK).json({
        app_id: body.app_id,
        setting_types: result,
      });
    } catch (e) {
      next(e);
    }
  }

  @PATCH({ endpoint: "/v1/todo/:todo_id" })
  async patchSettingType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any>> {
    try {
      const [queryParams, body] = await Promise.all([
        joi
          .object()
          .keys({ todo_id: joi.number().required() })
          .validateAsync(req.params),
        patchSchema.validateAsync(req.body),
      ]);
      const obj: Partial<ITodo> = {};
      if (body.todo) obj.todo = body.todo;
      if (body.status) obj.status = body.status;

      const result = await todoModel.updateById(queryParams.todo_id, obj);
      if (!result.length) {
        throw new NotFoundError(
          errorCodes.NOT_FOUND.message,
          errorCodes.NOT_FOUND.code
        );
      }
      return res.status(global.httpStatus.OK).json(result[0]);
    } catch (e) {
      next(e);
    }
  }

  @DELETE({ endpoint: "/v1/todo/:todo_id" })
  async deleteSettingType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any>> {
    try {
      const queryParams = await joi
        .object()
        .keys({ todo_id: joi.number().required() })
        .validateAsync(req.params);
      const result = await todoModel.deleteById(queryParams.todo_id);
      if (!result.length) {
        throw new NotFoundError(
          errorCodes.NOT_FOUND.message,
          errorCodes.NOT_FOUND.code
        );
      }
      return res.status(global.httpStatus.OK).send();
    } catch (e) {
      next(e);
    }
  }
}
