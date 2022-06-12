import groq from "groq";

import { client } from "../../utils";
import { Layout, PostCard } from "../../components";
import { Post } from "../../types";

const Posts = ({ posts }: { posts: Post[] }) => (
    <Layout>
        <section className="bg-indigo-800 p-10">
            <div className="container mx-auto px-5">
                <header className="flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold py-2">Blog Posts</h1>
                        <p>Here is what I have been learning</p>
                    </div>
                </header>
            </div>
        </section>

        <div className="container mx-auto py-4">
            <section>
                <div className="py-2 flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-6 md:gap-4">
                        {posts.length &&
                            posts.map(
                                (post: Post) =>
                                    post.slug && (
                                        <PostCard
                                            {...post}
                                            key={post.slug.current}
                                        />
                                    )
                            )}
                    </div>
                </div>
            </section>
        </div>
    </Layout>
);

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

export default Posts;
