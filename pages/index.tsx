/* eslint-disable camelcase */
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import PropTypes from "prop-types";
import Collage from "../components/Collage";
import Project from "../components/Project";
import { fullRepo, getInfo, getRepoInfo } from "../helpers/getInfo";

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
          <div className="paper col-span-2">
            <h1 className="uppercase text-3xl">About me</h1>
            Hi, I&apos;m am Alex Lavallee and I am current a student going to
            Charles Wright Academy in Tacoma, WA and I am very interested in
            computer science. The current languages that I am interested in
            include C#, TypeScript, Python, and Swift. Some of my favorite
            technologies with these langauges are Unity, NextJS, Flask, and
            SwiftUI.
          </div>
          <div className="paper col-span-2 lg:col-span-1">
            <h1 className="uppercase text-3xl">My Projects</h1>
            <ul className="list-disc ml-4">
              <li key="ContinuousIntegration">
                <Link href="#ContinuousIntegration">
                  <a className="underline text-blue-600 hover:text-blue-800">
                    ContinuousIntegration
                  </a>
                </Link>
                : A Continuous Integration solution based in docker that can
                follow a Directed Acyclic Graph of containers to allow for
                complex multi-stage builds
              </li>
              <li key="sshca">
                <Link href="#sshca">
                  <a className="underline text-blue-600 hover:text-blue-800">
                    sshca
                  </a>
                </Link>
                : SSH certificate authority using Typescript and Go to allow
                secure temporary access to needed servers
              </li>
              <li key="Lemmios">
                <Link href="#Lemmios">
                  <a className="underline text-blue-600 hover:text-blue-800">
                    Lemmios
                  </a>
                </Link>
                : A SwiftUI app for the social media site Lemmy
              </li>
              <li key="Lambda">
                <Link href="#Lambda">
                  <a className="underline text-blue-600 hover:text-blue-800">
                    Lambda
                  </a>
                </Link>
                : Social media site using NextJS similar to Reddit
              </li>
              <li key="portfolio">
                <Link href="#portfolio">
                  <a className="underline text-blue-600 hover:text-blue-800">
                    portfolio
                  </a>
                </Link>
                : If you&apos;ve already navigated around a little you might
                have noticed that this website is featured inside itself
              </li>
              <li key="iCalParser">
                <Link href="#iCalParser">
                  <a className="underline text-blue-600 hover:text-blue-800">
                    iCalParser
                  </a>
                </Link>
                : Utility to parse iCal files using swift
              </li>
              <li key="robocol">
                <Link href="#robocol">
                  <a className="underline text-blue-600 hover:text-blue-800">
                    robocol
                  </a>
                </Link>
                : A typescript library to communicate with FTC robots
              </li>
              <li key="remoteftc">
                <Link href="#remoteftc">
                  <a className="underline text-blue-600 hover:text-blue-800">
                    remoteftc
                  </a>
                </Link>
                : A web interface to control FTC robots with the option of
                remote
              </li>
              <li key="AutomationGame">
                <Link href="#AutomationGame">
                  <a className="underline text-blue-600 hover:text-blue-800">
                    AutomationGame
                  </a>
                </Link>
                : Game made with Unity similar to Factorio
              </li>
            </ul>
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
