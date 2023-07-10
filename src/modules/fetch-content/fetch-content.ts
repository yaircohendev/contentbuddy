import axios from "axios";
import { Dependencies } from "../../shared/models/dependencies.model.js";
import AdmZip from "adm-zip";
import { isHiddenFile, isMarkdownFile } from "../../shared/utils/fs.utils.js";
import { IAllPosts, IPost } from "../../shared/models/posts.model.js";

export function FetchContent(deps: Dependencies) {
  return {
    async fetchContentFromGithub() {
      const repoZip = await axios.get(
        `https://api.github.com/repos/${deps.config.contentSrc}/zipball/main`,
        { responseType: "arraybuffer" },
      );
      return await this.getContentItems(repoZip.data);
    },

    async getContentItems(itemsData: Buffer | string) {
      const entries = new AdmZip(itemsData).getEntries();
      const allPosts = {} as IAllPosts;

      for (const entry of entries) {
        if (entry.isDirectory || isHiddenFile(entry.name)) {
          continue;
        }
        const path = entry.entryName
          .split("/")
          .filter((item, i) => i !== 0)
          .join("/");
        const splitPath = path.split("/");
        const postName = splitPath[0] as string;

        if (!allPosts[postName]) {
          allPosts[postName] = {
            post: null,
            images: [],
          } as unknown as IPost;
        }
        const postObj = allPosts[postName] as IPost;
        if (isMarkdownFile(entry.name)) {
          postObj.post = await deps.postsParser.parse(
            entry.getData().toString("utf-8"),
            postName,
          );
          continue;
        }
        if (entry.name.match(/.+\.(jpg|jpeg|gif|png)/)) {
          const imageEntry = {
            name: `${postName}/${entry.name}`,
            value: entry.getData(),
          };
          postObj.images.push(imageEntry);
        }
      }

      return allPosts;
    },
  };
}
