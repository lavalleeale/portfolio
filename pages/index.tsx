/* eslint-disable camelcase */
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import Collage from "../components/Collage";
import { getInfo } from "../helpers/getInfo";
import headshotPic from "../public/headshot.png";

export default function Home({ name }) {
  return (
    <div>
      <Head>
        <meta name="description" content={`${name}'s Coding Portfolio`} />
        <title>Github Portfolio</title>
      </Head>
      <div className="grid grid-cols-2">
        <div className="paper">
          <h1 className="uppercase text-3xl">About me</h1>
          Hi, I&apos;m am Alex Lavallee and I am current a student going to
          Charles Wright Academy in Tacoma, WA and I am very interested in
          computer science. The current languages that I am interested in
          include C#, TypeScript, Python, and Swift. Some of my favorite
          technologies with these langauges are Unity, NextJS, Flask, and
          SwiftUI.
        </div>
        <div className="paper">
          <div className="relative aspect-[3/4] w-1/4 m-auto">
            <Image src={headshotPic} alt="" layout="fill" />
          </div>
        </div>
        <div className="paper">
          <h1 className="uppercase text-3xl">My Projects</h1>
          If you&apos;ve already navigated around a little you might have
          noticed that this portfolio itself is featured inside itself (
          <Link href={"/repo/portfolio"}>
            <a className="underline text-blue-600 hover:text-blue-800">Here</a>
          </Link>
          ). Every page on this portfolio (except this one!) is automatically
          generated from all of my public Github repositories so it always has
          my latest and greatest work. Some other projects that I am very proud
          of are{" "}
          <Link href={"/repo/Lambda"}>
            <a className="underline text-blue-600 hover:text-blue-800">
              Lambda
            </a>
          </Link>{" "}
          (Social media site using NextJS similar to Reddit),{" "}
          <Link href={"/repo/Lambda"}>
            <a className="underline text-blue-600 hover:text-blue-800">
              AutomationGame
            </a>
          </Link>{" "}
          (Game made with Unity similar to Factorio), and{" "}
          <Link href={"/repo/Lambda"}>
            <a className="underline text-blue-600 hover:text-blue-800">SSHCA</a>
          </Link>{" "}
          (SSH certificate authority using Typescript and Go to allow secure
          temporary access to needed servers)
        </div>
        <Collage />
      </div>
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const info = await getInfo();

  return {
    props: {
      name: info.name,
    },
  };
};

export const config = {
  unstable_runtimeJS: false,
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
};
