import fs from "fs";
const fsPromises = fs.promises;

export async function tryImport<T>(files: string[]): Promise<T | null> {
  for (const file of files) {
    try {
      const module = await import(file);
      return module.default;
    } catch (error) {
      // console.error(error);
    }
  }
  return null;
}

export const isMarkdownFile = (file: string): boolean => {
  return file.endsWith(".md") || file.endsWith(".mdx");
};

export const isHiddenFile = (file: string): boolean => {
  return file.startsWith(".");
};

export const upsertDir = async (dir: string) => {
  try {
    await fsPromises.rm(dir, { recursive: true });
  } catch {
    //
  }
  await fsPromises.mkdir(dir);
};
