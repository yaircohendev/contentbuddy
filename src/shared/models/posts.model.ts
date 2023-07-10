export interface IPostImage {
    name: string;
    value: Buffer;
}

export type MarkdownString = string;

export interface IPost {
    post: MarkdownString,
    images: IPostImage[];
}

export interface IAllPosts {
    [postSlug: string]: IPost;
}
