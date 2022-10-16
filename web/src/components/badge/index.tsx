import Image from "next/image";

type Props = {
    altText: string;
    badgeLink: string;
    imgLink: string;
};

export const Badge = ({ altText, badgeLink, imgLink }: Props) => (
    <div className="cursor-pointer">
        <a href={badgeLink} target="_blank" rel="noreferrer">
            <Image
                src={imgLink}
                alt={altText}
                layout="intrinsic"
                className="pt-6"
                width={200}
                height={200}
            />
        </a>
    </div>
);
