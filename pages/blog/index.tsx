/* eslint-disable camelcase */
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { getPostData, getPostSlugs } from "../../helpers/api";
import { getInfo } from "../../helpers/getInfo";

type BlogIndexProps = {
  name: string;
  posts: {
    title: string;
    slug: string;
    date: string;
    content: string;
  }[];
};
export default function Home({ posts, name }: BlogIndexProps) {
  return (
    <div>
      <Head>
        <meta name="description" content={`${name}'s Blog`} />
        <title>Github Portfolio</title>
      </Head>
      <div className="!pb-3 w-1/2 !m-auto">
        <div className="paper">
          <h1 className="text-4xl">{`${name}'s Blog`}</h1>
        </div>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.title}>
            <a className="paper block">
              <p className="float-right">
                {new Date(post.date).toLocaleString()}
              </p>
              <h2 className="text-3xl">{post.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const { name } = await getInfo();

  const posts = getPostSlugs().map((slug) => {
    return getPostData(slug);
  });

  return {
    props: {
      name,
      posts: posts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }),
    },
  };
};
