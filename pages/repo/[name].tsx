import marked from "marked";
import Head from "next/head";
import styles from "../../styles/Home.module.css";

const id = ({ repo, readme, languages }) => (
  <div className={styles.card}>
    <Head>
      <meta name="description" content={`Alex Lavallee's ${repo.name}`} />
      <title>{repo.name}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <a href="/" className={styles.card} style={{ marginLeft: "0px" }}>
      <h3 style={{ display: "inline" }}>&#60; BACK</h3>
    </a>
    <p style={{ marginTop: 25 }}>Name: {repo.name}</p>
    <p>Language: {Object.keys(languages).slice(0, 3).join(", ")}</p>
    <p>License: {repo.license ? repo.license.name : "None"}</p>
    <p>
      Homepage:{" "}
      {repo.homepage ? <a href={repo.homepage}>{repo.homepage}</a> : "None"}
    </p>
    <p>Last Modified: {new Date(repo.updated_at).toDateString()}</p>
    <p>
      Link: <a href={repo.html_url}>{repo.html_url}</a>
    </p>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: readme }} />
  </div>
);

export default id;

export async function getStaticPaths() {
  const repos = await (
    await fetch("https://api.github.com/users/lavalleeale/repos", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
  ).json();
  return {
    paths: repos.map((repo) => ({ params: { name: repo.name } })),
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const repo = await (
    await fetch(
      `https://api.github.com/repos/lavalleeale/${context.params.name}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Token ${process.env.PAT}`,
        },
      }
    )
  ).json();
  const readmeData = await (
    await fetch(repo.contents_url.replace("{+path}", "README.md"), {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
  ).json();
  const readme: string = marked(
    await (
      await fetch(readmeData.download_url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Token ${process.env.PAT}`,
        },
      })
    ).text()
  );
  const languages = await (
    await fetch(repo.languages_url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
  ).json();
  return {
    props: {
      repo,
      readme,
      languages,
    },
  };
}
