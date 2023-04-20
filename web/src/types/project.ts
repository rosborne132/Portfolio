import { Slug } from './post'

export type Project = {
    description: string;
    link: string;
    slug?: Slug;
    title: string;
}
