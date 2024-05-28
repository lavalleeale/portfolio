/* eslint-disable camelcase */
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getPostData, getPostSlugs } from "../../helpers/api";
import { getInfo } from "../../helpers/getInfo";

type BlogItemProps = {
  name: string;
  post: {
    title: string;
    slug: string;
    date: string;
    content: string;
  };
};
export default function Home({ post, name }: BlogItemProps) {
  return (
    <div>
      <Head>
        <meta name="description" content={`${name}'s Blog`} />
        <title>Github Portfolio</title>
      </Head>
      <div className="w-3/4 !m-auto paper">
        <p className="float-right">{new Date(post.date).toLocaleString()}</p>
        <h2 className="text-3xl">{post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
export const getStaticProps: GetStaticProps<BlogItemProps> = async ({
  params,
}) => {
  const { name } = await getInfo();

  return {
    props: {
      name,
      post: getPostData((params.slug as string) + ".md", true),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostSlugs().map((slug) => {
    return {
      params: {
        slug: slug.replace(/\.md$/, ""),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
