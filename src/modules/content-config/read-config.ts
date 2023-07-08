import { Config, ConfigModel } from "./content-config.model.js";
import { tryImport } from "../../shared/utils/fs.utils.js";
import { CONFIG_FILE_NAMES } from "./constants.js";
import { IArgv } from "../../core/args/args.model.js";

export async function readConfig(argv: IArgv) {
  const importResult = await fetchConfigFromFolder(argv.configFolder);
  if (!importResult) {
    throw Error(
      'No config file found. Create a config file named "contentbuddy.config.<js/ts/json>" in the root of your project.',
    );
  }
  return Config.parse(importResult);
}

async function fetchConfigFromFolder(configFolder: string) {
  const paths = CONFIG_FILE_NAMES.map((name) => {
    const path = configFolder ? `${configFolder}/${name}` : name;
    return `${process.cwd()}/${path}`;
  });
  return await tryImport<ConfigModel>(paths);
}
