import { Dependencies } from "../../shared/models/dependencies.model.js";
import path from "path";
import fs from "fs";
import { IAllPosts } from "../../shared/models/posts.model.js";
import { upsertDir } from "../../shared/utils/fs.utils.js";

export default function ContentWriter(deps: Dependencies) {
  return {
    async write(allPosts: IAllPosts) {
      const root = deps.config.contentOutput;
      const configFolder = deps.argv.configFolder
        ? `${deps.argv.configFolder}/`
        : "";
      const rootDir = `${process.cwd()}/${configFolder}${root}`;
      const imagesDir = `${process.cwd()}/${configFolder}${
        deps.config.assetsFolder
      }`;
      const blogDir = rootDir;
      await upsertDir(imagesDir);
      await upsertDir(blogDir);

      for (const [name, value] of Object.entries(allPosts)) {
        if (!value.post) {
          continue;
        }
        const postPath = `${blogDir}/${name}.mdx`;
        await fs.promises.writeFile(postPath, value.post);
        const imagesFolderPath = `${imagesDir}/${name}`;
        await upsertDir(imagesFolderPath);

        for (const image of value.images) {
          const [fileName] = image.name.split("/").slice(1);
          const imagePath = `${imagesFolderPath}/${fileName}`;
          await fs.promises.writeFile(imagePath, image.value);
        }
      }
    },
  };
}
