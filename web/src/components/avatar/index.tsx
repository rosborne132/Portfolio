import Image from "next/image";

import { urlFor } from "../../utils";

type Props = {
    authorImage: any;
    name: string;
};

export const Avatar = ({ authorImage, name }: Props) => (
    <div className="avatar">
        <div className="w-20">
            <Image
                src={urlFor(authorImage).url()}
                alt={`${name}'s picture`}
                layout="fill"
                className="rounded-full border-white border-2 w-20"
            />
        </div>
    </div>
);
