export type Author = {
    _ref: string;
    _type: string;
};

export type Asset = {
    _ref: string;
    _type: string;
};

export type Body = {
    _key: string;
    _type: string;
    children: any[];
    markDefs: any[];
    style: string;
};

export type Category = {
    _key: string;
    _ref: string;
    _type: string;
};

export type Image = {
    _type: string;
    asset: Asset;
};

export type Slug = {
    _type: string;
    current: string;
};

export type Post = {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
    author: Author;
    authorImage: Image;
    body: Body;
    categories: Category[];
    description: string;
    mainImage: Image;
    name: string;
    publishedAt: string;
    slug: Slug;
    title: string;
};
