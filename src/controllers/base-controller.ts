import { logger, Logger } from "../settings/logger";

export abstract class BaseController {
  protected static readonly logger: Logger = logger;
}
