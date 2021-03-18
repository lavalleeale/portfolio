import Head from "next/head";
import PropTypes from "prop-types";
import styles from "../styles/Home.module.css";

// require("dotenv-safe").config();

export default function Home({ repos, languages }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Alex Lavallee's Coding Portfolio" />
        <title>Github Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>The Portfolio</h2>

        <div className={styles.grid}>
          {repos.map((repo, index) => (
            <a
              key={repo.id}
              className={styles.cardwithhover}
              href={`/repo/${repo.name}`}
            >
              <h3>{repo.name}</h3>
              <p>{Object.keys(languages[index]).slice(0, 3).join(", ")}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
export async function getStaticProps() {
  const repos = await (
    await fetch("https://api.github.com/users/lavalleeale/repos", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
  ).json();
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
    props: { repos, languages }, // will be passed to the page component as props
  };
}

Home.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      language: PropTypes.string,
    })
  ).isRequired,
  languages: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
};
