#!/usr/bin/env node
import { readConfig } from "./modules/content-config/read-config.js";
import { argv } from "./core/args/args.js";
import { Dependencies } from "./shared/models/dependencies.model.js";
import { FetchContent } from "./modules/fetch-content/fetch-content.js";
import { ParseContent } from "./modules/parse-content/parse-content.js";
import ContentWriter from "./modules/content-writer/content-writer.js";

async function init() {
  const config = await readConfig(argv);
  const postsParser = ParseContent(config);
  const deps: Dependencies = {
    argv: argv,
    config,
    postsParser,
  };
  const fetchContent = FetchContent(deps);
  const contentWriter = ContentWriter(deps);
  const posts = await fetchContent.fetchContentFromGithub();
  await contentWriter.write(posts);
}

init();
