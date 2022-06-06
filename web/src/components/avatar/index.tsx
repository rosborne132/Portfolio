import Image from "next/image";

import { urlFor } from "../../utils";

type Props = {
    authorImage: any;
    name: string;
};

export const Avatar = ({ authorImage, name }: Props) => (
    <div className="avatar">
        <div className="w-24 rounded-xl">
            <Image
                src={urlFor(authorImage).url()}
                alt={`${name}'s picture`}
                layout="fill"
                className="w-24 rounded-xl"
            />
        </div>
    </div>
);
