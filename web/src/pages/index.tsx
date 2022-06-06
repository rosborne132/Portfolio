import groq from "groq";

import { Layout, PostCard } from "../components";
import { client } from "../utils";
import { Post } from "../types";

const Home = ({ posts }: { posts: any }) => {
    return (
        <Layout>
            <header>
                <h1 className="text-3xl font-bold">Rob Osborne</h1>
                <p>Software Engineer in the Portland area.</p>
            </header>

            <section>
                <header>
                    <h2>About</h2>
                </header>
                <p>
                    I am a software engineer and I love listening to music while
                    getting heads down in code. My current interests are in
                    digital art and 3D.
                </p>
                <p>
                    Outside of coding, I like to play guitar and make digital
                    art. On rainy days I love to spend my time playing and
                    taking apart video games. Much like code, I like to see how
                    my favorite things work.
                </p>
            </section>

            <section>
                <header>
                    <h2>Certifications</h2>
                </header>
                <p>See all of my current certifications! :)</p>

                {/* TODO: Import old badge component */}
                {/* Import from CMS */}
                {/* <div>
                    <Badge
                        altTest="AWS Developer Cert"
                        badgeLink="https://www.certmetrics.com/amazon/public/badge.aspx?i=2&t=c&d=2020-03-07&ci=AWS00487144"
                        imgLink="https://d1.awsstatic.com/training-and-certification/Certification%20Badges/AWS-Certified_Developer_Associate_512x512.6d5f0ad35de66966c96f8e408e4fd919c1a2d753.png"
                    />
                </div> */}
            </section>

            <section>
                <header>
                    <h2>Projects</h2>
                </header>
                {/* Import from CMS */}
                TBD
            </section>

            <section>
                <header>
                    <h2>Blog Posts</h2>
                </header>
                <div>
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
