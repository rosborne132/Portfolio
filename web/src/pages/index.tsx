import groq from "groq";

import { client } from "../utils";

import { Badge, Layout } from "../components";

import { Certification } from "../types";

const padding = 'pb-20 pl-20 pr-20 pt-20';

const Home = ({ certifications }: { certifications: Certification[] }) => (
    <Layout>
        <section className={`hero bg-primary text-primary-content ${padding}`}>
            <div className="hero-content mx-auto px-5">
                <header className="flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold py-2">Rob Osborne</h1>
                        <p>Software Engineer in the Portland area.</p>
                    </div>
                </header>
            </div>
        </section>

        <section className={padding}>
            <div className="container mx-auto px-4">
                <header>
                    <h2 className="text-2xl font-bold text-center py-2">
                        About
                    </h2>
                </header>
            </div>

            <p className="indent-4">
                I am a software engineer and I love listening to music while
                getting heads down in code. My current interests are in digital
                art and 3D.
            </p>
            <br />
            <p className="indent-4">
                Outside of coding, I like to play guitar and make digital art.
                On rainy days I love to spend my time playing and taking apart
                video games. Much like code, I like to see how my favorite
                things work.
            </p>
        </section>

        <section className={padding}>
            <div className="container mx-auto px-4">
                <header>
                    <h2 className="text-2xl font-bold text-center py-2">
                        Certifications
                    </h2>
                </header>
            </div>

            {certifications.map((cert: Certification) => (
                <Badge
                    altText={cert.title}
                    badgeLink={cert.badgeLink}
                    key={cert.title}
                    imgLink={cert.imgLink}
                />
            ))}
        </section>

        <section className={padding}>
            <div className="container mx-auto px-4">
                <header>
                    <h2 className="text-2xl font-bold text-center py-2">
                        Projects
                    </h2>
                </header>
            </div>
            {/* Import from CMS */}
            <p className="text-center">Coming soon</p>
        </section>
    </Layout>
);

export async function getStaticProps() {
    const certifications = await client.fetch(groq`
    *[_type == "certifications"] | order(publishedAt desc)
  `);

    return {
        props: {
            certifications,
        },
    };
}

export default Home;
