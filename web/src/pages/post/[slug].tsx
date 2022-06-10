import groq from "groq";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

import { client, urlFor } from "../../utils";
import { Avatar, Layout } from "../../components";
import { Post } from "../../types";

const ptComponents = {
    types: {
        image: ({ value }: { value: any }) => {
            if (!value?.asset?._ref) return null;

            const imageLink = urlFor(value)
                .width(320)
                .height(240)
                .fit("max")
                .auto("format") as unknown;

            return (
                <Image
                    alt={value.alt || " "}
                    loading="lazy"
                    src={imageLink as string}
                />
            );
        },
    },
};

const Profile = (post: Post) => (
    <div className="flex items-center mb-3 last:mb-0">
        {post.authorImage && <Avatar {...post} />}
        <div className="pl-3">
            <span className="font-medium text-sm ml-1 block">{post.name}</span>
        </div>
    </div>
);

const Categories = (post: Post) => (
    <>
        {post.categories &&
            post.categories.map((category: any) => (
                <span
                    className="p-1 px-3 mr-1 mb-1 inline-block text-xs font-mono rounded bg-green-200 text-green-800 hover:bg-blue-200 hover:text-blue-800 transition duration-300 ease-in-out"
                    key={category}
                >
                    {category}
                </span>
            ))}
    </>
);

const Post = ({ post }: { post: Post }) => {
    return (
        <Layout>
            <article className="container mx-auto px-6 md:px-4">
                <div className="heading py-6 md:py-12 lg:w-10/12 md:text-center mx-auto">
                    <h1 className="heading text-4xl md:text-6xl font-bold font-sans md:leading-tight">
                        {post.title}
                    </h1>
                    <h2 className="text-xl text-gray-600 mt-2">
                        {post.description}
                    </h2>
                </div>

                <div className="flex flex-col pb-3 md:hidden">
                    <Profile {...post} />
                </div>

                <Image
                    src={urlFor(post.mainImage.asset).url()}
                    alt={post.slug.current}
                    width={1600}
                    height={900}
                />

                <div className="flex flex-col md:flex-row py-6 md:py-12">
                    <div className="w-full md:w-3/12 pr-3">
                        <div className="hidden flex-col md:flex mb-3 md:mb-6">
                            <Profile {...post} />
                        </div>

                        <div className="hidden md:block">
                            <Categories {...post} />
                        </div>
                    </div>

                    <div className="w-full md:w-9/12">
                        <div className="prose prose-zinc">
                            <PortableText
                                value={post.body}
                                components={ptComponents}
                            />
                        </div>
                    </div>
                </div>

                <div className="py-6 mt-6 border-t-2 block md:hidden">
                    <h3 className="text-sm font-medium mb-1">Categories</h3>
                    <div>
                        <Categories {...post} />
                    </div>
                </div>
            </article>
        </Layout>
    );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  description,
  mainImage,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body,
  slug
}`;

export async function getStaticPaths() {
    const paths = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    );

    return {
        paths: paths.map((slug: any) => ({ params: { slug } })),
        fallback: false,
    };
}

export async function getStaticProps(context: any) {
    const { slug = "" } = context.params;
    const post = await client.fetch(query, { slug });

    return {
        props: {
            post,
        },
    };
}

export default Post;
