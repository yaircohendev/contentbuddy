import { ConfigModel } from "../content-config/content-config.model.js";
import remarkMdx from "remark-mdx";
import remarkFrontmatter from "remark-frontmatter";
import { remarkImagePath } from "./remark-image-path.js";
import { remark } from "remark";

export function ParseContent(config: ConfigModel) {
  return {
    async parse(post: string, postName: string) {
      const imagesPrefixPath = `${config.assetsRootFolder}/${postName}`;
      return await remark()
        .use(remarkMdx)
        .use(remarkFrontmatter)
        .use(remarkImagePath(imagesPrefixPath))
        .process(post)
        .then((result: any) => result.toString("utf-8"));
    },
  };
}
