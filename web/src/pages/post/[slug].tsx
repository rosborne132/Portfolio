import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import client from "../../utils/client";
import { Layout } from "../../components";

const urlFor = (source: any) => imageUrlBuilder(client).image(source);

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
                <img
                    alt={value.alt || " "}
                    loading="lazy"
                    src={imageLink as string}
                />
            );
        },
    },
};

const Post = ({ post }: { post: any }) => {
    const {
        title = "Missing title",
        name = "Missing name",
        categories,
        authorImage,
        body = [],
    } = post;
    return (
        <Layout>
            <article>
                <h1>{title}</h1>
                <span>By {name}</span>
                {categories && (
                    <ul>
                        Posted in
                        {categories.map((category: any) => (
                            <li key={category}>{category}</li>
                        ))}
                    </ul>
                )}
                {authorImage && (
                    <div className="avatar">
                        <div className="w-24 rounded-xl">
                            <img
                                src={urlFor(authorImage).url()}
                                alt={`${name}'s picture`}
                            />
                        </div>
                    </div>
                )}
                <PortableText value={body} components={ptComponents} />
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
        fallback: true,
    };
}

export async function getStaticProps(context: any) {
    // It's important to default the slug so that it doesn't return "undefined"
    const { slug = "" } = context.params;
    const post = await client.fetch(query, { slug });

    return {
        props: {
            post,
        },
    };
}

export default Post;
