/* eslint-disable camelcase */
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";
import { getInfo } from "../helpers/getInfo";
import lambdaPic from "../public/collage/lambda.png";
import portfolioPic from "../public/collage/portfolio.png";
import stackPic from "../public/collage/stack.png";
import tetrisPic from "../public/collage/tetris.png";

export default function Home({ name }) {
  return (
    <div>
      <Head>
        <meta name="description" content={`${name}'s Coding Portfolio`} />
        <title>Github Portfolio</title>
      </Head>
      <div className="paper">
        <h1 className="uppercase text-3xl">About the portfolio</h1>
        Hey there, welcome to {name}&apos;s Coding Portfolio! If you&apos;ve
        already navigated around a little you might have noticed that this
        portfolio itself is featured inside itself (
        <Link href={"/repo/portfolio"}>
          <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
            Here
          </a>
        </Link>
        ). Every page on this portfolio (except this one!) is automatically
        generated from all of my public github repositories so it always has my
        latest and greatest work.
      </div>
      <div className="paper">
        <h1 className="uppercase text-3xl">About me</h1>
        Hi, I&apos;m am Alex Lavallee and I am current a student going to
        Charles Wright Academy in Tacoma, WA and I am very interested in
        computer science. The current languages that I am interested in include
        C#, TypeScript, Python, and Swift. Some of my favorite technologies with
        these langauges are Unity, NextJS, Flask, and SwiftUI.
      </div>
      <div className="w-full p-1 bg-slate-200 -z-10 filter">
        <div className="grid grid-cols-4 align-middle">
          <div className="col-span-3  inline-block">
            <div className="aspect-[2940/475] relative">
              <Link href="/repo/Lambda" passHref>
                <a>
                  <Image src={lambdaPic} alt="" layout="fill" />
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-2 pt-1 gap-1">
              <div className="aspect-[2940/1626] relative">
                <Link href="/repo/portfolio" passHref>
                  <a>
                    <Image src={portfolioPic} alt="" layout="fill" />
                  </a>
                </Link>
              </div>
              <div className="aspect-[2166/1198] relative">
                <Link href="/repo/Stack" passHref>
                  <a>
                    <Image src={stackPic} alt="" layout="fill" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="aspect-[1222/1616] relative inline-block">
            <Link href="/repo/tetris" passHref>
              <a>
                <Image src={tetrisPic} alt="" layout="fill" />
              </a>
            </Link>
          </div>
        </div>
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

// export const config = {
//   unstable_runtimeJS: false,
// };

Home.propTypes = {
  name: PropTypes.string.isRequired,
};
