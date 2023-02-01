/* eslint-disable camelcase */
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import Collage from "../components/Collage";
import Project from "../components/Project";
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
      <div>
        <div className="grid grid-cols-2 gap-3 pb-3">
          <div className="paper col-span-2 lg:col-span-1">
            <h1 className="uppercase text-3xl">About me</h1>
            Hi, I&apos;m am Alex Lavallee and I am current a student going to
            Charles Wright Academy in Tacoma, WA and I am very interested in
            computer science. The current languages that I am interested in
            include C#, TypeScript, Python, and Swift. Some of my favorite
            technologies with these langauges are Unity, NextJS, Flask, and
            SwiftUI.
          </div>
          <div className="paper hidden lg:block">
            <div className="relative aspect-[3/4] w-1/4 m-auto">
              <Image src={headshotPic} alt="" layout="fill" />
            </div>
          </div>
          <div className="paper col-span-2 lg:col-span-1">
            <h1 className="uppercase text-3xl">My Projects</h1>
            If you&apos;ve already navigated around a little you might have
            noticed that this portfolio itself is featured inside itself (
            <Link href="#portfolio">
              <a className="underline text-blue-600 hover:text-blue-800">
                Here
              </a>
            </Link>
            ). Every page on this portfolio (except this one!) is automatically
            generated from all of my public Github repositories so it always has
            my latest and greatest work. Some other projects that I am very
            proud of are{" "}
            <Link href="#Lambda">
              <a className="underline text-blue-600 hover:text-blue-800">
                Lambda
              </a>
            </Link>{" "}
            (Social media site using NextJS similar to Reddit),{" "}
            <Link href="#AutomationGame">
              <a className="underline text-blue-600 hover:text-blue-800">
                AutomationGame
              </a>
            </Link>{" "}
            (Game made with Unity similar to Factorio), and{" "}
            <Link href="#sshca">
              <a className="underline text-blue-600 hover:text-blue-800">
                SSHCA
              </a>
            </Link>{" "}
            (SSH certificate authority using Typescript and Go to allow secure
            temporary access to needed servers)
          </div>
          <div className="paper col-span-2 lg:col-span-1">
            <Collage />
          </div>
        </div>
        {repos
          .sort(
            (a, b) =>
              order.split(" ").indexOf(a.repo.name) -
              order.split(" ").indexOf(b.repo.name)
          )
          .map((repo) => (
            <>
              <a id={repo.repo.name} />
              <Project
                key={repo.repo.name}
                languages={repo.languages}
                readme={repo.readme}
                repo={repo.repo}
              />
            </>
          ))}
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
