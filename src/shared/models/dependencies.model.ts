import { IArgv } from "../../core/args/args.model.js";
import { ConfigModel } from "../../modules/content-config/content-config.model.js";
import { ParseContent } from "../../modules/parse-content/parse-content.js";

export interface Dependencies {
  argv: IArgv;
  config: ConfigModel;
  postsParser: ReturnType<typeof ParseContent>;
}
