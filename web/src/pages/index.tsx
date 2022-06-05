import Link from "next/link";
import groq from "groq";

import { Layout } from "../components";
import client from "../utils/client";

const Home = ({ posts }: { posts: any }) => {
    return (
        <Layout>
            <header>
                <h1 className="text-3xl font-bold">
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>
            </header>

            <section>
                <header>
                    <h2>Blog Posts</h2>
                </header>
                <div>
                    {posts.length > 0 &&
                        posts.map(
                            ({
                                _id,
                                title = "",
                                slug = "",
                                publishedAt = "",
                            }: {
                                _id: any;
                                title: string;
                                slug: any;
                                publishedAt: string;
                            }) => {
                                console.log("slug: ", slug);
                                return (
                                    slug && (
                                        <li key={_id}>
                                            <Link
                                                href="/post/[slug]"
                                                as={`/post/${slug.current}`}
                                            >
                                                <a>{title}</a>
                                            </Link>{" "}
                                            (
                                            {new Date(
                                                publishedAt
                                            ).toDateString()}
                                            )
                                        </li>
                                    )
                                );
                            }
                        )}
                </div>
            </section>
        </Layout>
    );
};

export async function getStaticProps() {
    const posts = await client.fetch(groq`
    *[_type == "post"] | order(publishedAt desc)
  `);
    return {
        props: {
            posts,
        },
    };
}

export default Home;
