import minimist from "minimist";
import { IArgv } from "./args.model.js";

export const argv = minimist<IArgv>(process.argv.slice(2));
