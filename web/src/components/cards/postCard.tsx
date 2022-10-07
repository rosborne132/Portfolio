import Image from "next/image";

import { urlFor } from "../../utils";
import { Post } from "../../types";

export const PostCard = (post: Post) => (
    <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
            <Image
                src={urlFor(post.mainImage).url()}
                alt={post.slug.current}
                width={700}
                height={475}
            />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{post.title}</h2>
            <p>{post.description}</p>
            <div className="card-actions justify-end pt-3">
                <a
                    className="btn btn-primary"
                    href={`/posts/${post.slug.current}`}
                    rel="noreferrer"
                >
                    read more
                </a>
            </div>
        </div>
    </div>
);
