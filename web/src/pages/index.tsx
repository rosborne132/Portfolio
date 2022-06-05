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
                    {posts.length &&
                        posts.map(
                            (post: any) => {
                                console.log("post: ", post);
                                return (
                                    post.slug && (
                                        // <li key={post._id}>
                                        //     <Link
                                        //         href={`/post/${post.slug.current}`}
                                        //     >
                                        //         <a>{post.title}</a>
                                        //     </Link>
                                        // </li>

                                        <div className="card w-96 bg-base-100 shadow-xl">
                                        <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
                                        <div className="card-body">
                                          <h2 className="card-title">{post.title}</h2>
                                          <p>If a dog chews shoes whose shoes does he choose?</p>
                                          <div className="card-actions justify-end">
                                            <button className="btn btn-primary">read more</button>
                                          </div>
                                        </div>
                                      </div>
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
