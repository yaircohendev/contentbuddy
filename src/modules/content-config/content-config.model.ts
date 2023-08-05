import { z } from "zod";

export const Config = z.object({
  /*
    The folder where the images will be copied to. Useful when you want
    to save images under the public, or assets folder of your app.
  */
  assetsFolder: z.string(),
  /*
   The path that will be used inside the markdown files. Useful when the full folder path isn't required in order to
   load the image, e.g. using "public/assets" as your assets folder, but then when referencing an image needing to use "/assets" alone.
   */
  assetsFolderPath: z.string().optional(),
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
