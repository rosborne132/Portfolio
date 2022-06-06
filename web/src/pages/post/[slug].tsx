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

const Post = ({ post }: { post: Post }) => {
    return (
        <Layout>
            <article className="prose prose-zinc">
                <h1>{post.title}</h1>
                <span>By {post.name}</span>
                {post.categories && (
                    <ul>
                        Posted in
                        {post.categories.map((category: any) => (
                            <li key={category}>{category}</li>
                        ))}
                    </ul>
                )}
                {post.authorImage && <Avatar {...post} />}
                <PortableText value={post.body} components={ptComponents} />
            </article>
        </Layout>
    );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
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
