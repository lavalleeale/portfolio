/* eslint-disable camelcase */
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import PropTypes from "prop-types";
import { getInfo } from "../helpers/getInfo";

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
  const info = await getInfo();
  const languages = await Promise.all(
    info.repos.map(async (repo) =>
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
      repos: info.repos.map((repo) => ({ id: repo.id, name: repo.name })),
      languages,
      name: info.name,
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
