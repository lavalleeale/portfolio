import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Project from "../../components/Project";
import { fullRepo, getInfo, getRepoInfo } from "../../helpers/getInfo";

type repoProps = {
  repo: fullRepo;
  languages: string[];
  readme: string;
};

const id = ({ repo, readme, languages }: repoProps) => (
  <div>
    <Head>
      <meta name="description" content={repo.name} />
      <title>{repo.name}</title>
    </Head>
    <Project repo={repo} languages={languages} readme={readme} />
  </div>
);

export default id;

export const getStaticPaths: GetStaticPaths = async () => {
  const { login } = await (
    await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
  ).json();

  const repos = (
    await (
      await fetch("https://api.github.com/user/repos", {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Token ${process.env.PAT}`,
        },
      })
    ).json()
  ).filter((repo) => repo.owner.login === login && !repo.private);
  return {
    paths: repos.map((repo) => ({ params: { name: repo.name } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<repoProps> = async (context) => {
  const { name, login } = await getInfo();

  const { repo, readme, languages } = await getRepoInfo({
    url: `https://api.github.com/repos/${login}/${context.params.name}`,
  });
  return {
    props: {
      repo,
      readme,
      languages,
      name,
    },
    revalidate: 10 * 60 * 60,
  };
};

export const config = {
  unstable_runtimeJS: false,
};
