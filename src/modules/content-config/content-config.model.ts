import { z } from "zod";

export const Config = z.object({
  /*
    The folder where the images will be copied to. Useful when you want
    to save images under the public, or assets folder of your app.
  */
  assetsRootFolder: z.string(),
  /*
    Which folder to save the actual content to.
  */
  contentOutput: z.string(),
  /*
    A GitHub username and repo (e.g. "yaircohendev/contentbuddy")
  */
  contentSrc: z.string(),
});

export type ConfigModel = z.infer<typeof Config>;
