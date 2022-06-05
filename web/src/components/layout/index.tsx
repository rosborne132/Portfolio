import React from "react";
import Head from "next/head";
import Link from "next/link";
import { AiFillGithub, AiFillLinkedin, AiFillSmile } from "react-icons/ai";
import { IconContext } from "react-icons";

type Props = {
    children: JSX.Element[] | JSX.Element;
};

export const Layout = ({ children }: Props) => (
    <div className="flex flex-col h-screen">
        <Head>
            <title>Portfolio</title>
            <meta name="description" content="Portfolio" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="navbar bg-base-100 p-4">
            <Link className="btn btn-ghost normal-case text-xl" href="/">
                Portfolio
            </Link>
        </div>

        <main className="p-4 flex-grow bg-gray-200s">{children}</main>

        <footer className="footer footer-center p-5 bg-primary text-primary-content">
            <IconContext.Provider value={{ color: "white", size: "2em" }}>
                <div>
                    <AiFillSmile />
                    <p className="font-bold">Creating tools on the web</p>
                    <p>Copyright © {new Date().getFullYear()}</p>
                </div>
                <div>
                    <div className="grid grid-flow-col gap-4">
                        <a
                            href="https://github.com/rosborne132"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <AiFillGithub />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/robert-osborne-037857100"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <AiFillLinkedin />
                        </a>
                    </div>
                </div>
            </IconContext.Provider>
        </footer>
    </div>
);
