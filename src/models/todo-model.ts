import { BaseModel } from "./base-model";
import { UnProcessableEntityError } from "../responses";

/** Interface define base properties that is common in create & update request */
export interface ITodo {
  todo: string;
  status: Status;
  is_deleted: boolean;
}

enum Status {
  New = 1,
  InProgress = 2,
  Done = 3,
  Cancelled = 4,
}

export class TodoModel extends BaseModel {
  constructor() {
    super();
  }

  async create(data: ITodo): Promise<void> {
    try {
      return await this.knex("todo").insert(data);
    } catch (e) {
      if (this.isDuplicateRow(e))
        throw new UnProcessableEntityError(
          this.errorCodes.RESOURCE_ALREADY_EXIST.message,
          this.errorCodes.RESOURCE_ALREADY_EXIST.code
        );
      throw e;
    }
  }

  async fetchByAppId(appId: string): Promise<ITodo[]> {
    return await this.knex("todo")
      .where({
        is_deleted: false,
      })
      .select(["id", "todo", "status"]);
  }

  async updateById(id: number, params: Partial<ITodo>): Promise<ITodo[]> {
    try {
      return await this.knex("todo")
        .where({
          id,
          is_deleted: false,
        })
        .update(params)
        .returning(["id", "todo", "status"]);
    } catch (e) {
      if (this.isDuplicateRow(e))
        throw new UnProcessableEntityError(
          this.errorCodes.RESOURCE_ALREADY_EXIST.message,
          this.errorCodes.RESOURCE_ALREADY_EXIST.code
        );
      throw e;
    }
  }

  async deleteById(id: number): Promise<ITodo[]> {
    return await this.updateById(id, { is_deleted: true });
  }
}
