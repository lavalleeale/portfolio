/* eslint-disable camelcase */
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import PropTypes from "prop-types";

export default function Home({ repos, languages, name }) {
  return (
    <div>
      <Head>
        <meta name="description" content={`${name}'s Coding Portfolio`} />
        <title>Github Portfolio</title>
      </Head>
      {repos.map((repo, index) => (
        <Link href={`/repo/${repo.name}`} key={repo.id}>
          <a>
            <div className="paper">
              <h5 className="text-xl">{repo.name}</h5>
              <p color="textSecondary">
                Languages:{" "}
                {Object.keys(languages[index]).slice(0, 3).join(", ")}
              </p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const repos_urls = [];
  const {
    name,
    login,
    organizations_url,
    repos_url: selfReposUrl,
  } = await (
    await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
  ).json();
  repos_urls.push({ login, repos_url: selfReposUrl });
  (
    await (
      await fetch(organizations_url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Token ${process.env.PAT}`,
        },
      })
    ).json()
  ).map((org) =>
    repos_urls.push({ login: org.login, repos_url: org.repos_url })
  );

  const repos = (
    await Promise.all<
      {
        private: boolean;
        owner: { login: string };
        languages_url: string;
        id: number;
        name: string;
      }[][]
    >(
      await Promise.all(
        repos_urls.map(async ({ repos_url }) =>
          (
            await fetch(repos_url, {
              headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `Token ${process.env.PAT}`,
              },
            })
          ).json()
        )
      )
    )
  )
    .map((repos_lists, index) =>
      repos_lists.filter(
        (repo) => repo.owner.login === repos_urls[index].login && !repo.private
      )
    )
    .flat();

  const languages = await Promise.all(
    repos.map(async (repo) =>
      (
        await fetch(repo.languages_url, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `Token ${process.env.PAT}`,
          },
        })
      ).json()
    )
  );

  return {
    props: {
      repos: repos.map((repo) => ({ id: repo.id, name: repo.name })),
      languages,
      name,
    },
    revalidate: 10 * 60 * 60,
  };
};

export const config = {
  unstable_runtimeJS: false,
};

Home.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      language: PropTypes.string,
    })
  ).isRequired,
  languages: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
  name: PropTypes.string.isRequired,
};
