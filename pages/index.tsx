/* eslint-disable camelcase */
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import PropTypes from "prop-types";
import { fullRepo, getInfo, getRepoInfo } from "../helpers/getInfo";
import headshotPic from "../public/headshot.png";

type HomeProps = {
  name: string;
  order: string;
  repos: {
    repo: fullRepo;
    readme: string;
    languages: string[];
  }[];
};
export default function Home({ name, repos, order }: HomeProps) {
  return (
    <div>
      <Head>
        <meta name="description" content={`${name}'s Coding Portfolio`} />
        <title>Github Portfolio</title>
      </Head>
      <div className="grid grid-cols-2 gap-3 !pb-3 w-1/2 !m-auto paper">
        <div className="col-span-2 lg:col-span-1">
          <h1 className="uppercase text-3xl">About me</h1>
          Hi, I&apos;m am Alex Lavallee and I am current a student going to
          Charles Wright Academy in Tacoma, WA and I am very interested in
          computer science. The current languages that I am interested in
          include C#, TypeScript, Python, and Swift. Some of my favorite
          technologies with these langauges are Unity, NextJS, Flask, and
          SwiftUI.
        </div>
        <div className="hidden lg:block">
          <div className="relative aspect-[3/4] w-1/2 m-auto">
            <Image src={headshotPic} alt="" layout="fill" />
          </div>
        </div>
      </div>
    </div>
  );
}
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { name, repos } = await getInfo();

  return {
    props: {
      order: process.env.ORDER,
      name,
      repos: await Promise.all(
        repos.map(async (repo) => await getRepoInfo(repo))
      ),
    },
  };
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
};
