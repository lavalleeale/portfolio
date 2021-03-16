import marked from "marked";
import styles from "../../styles/Home.module.css";

const id = ({ repo, readme, languages }) => (
  <div className={styles.card}>
    <p>Name: {repo.name}</p>
    <p>Language: {Object.keys(languages).slice(0, 3).join(", ")}</p>
    <p>License: {repo.license ? repo.license.name : "None"}</p>
    <p>
      Homepage:{" "}
      {repo.homepage ? <a href={repo.homepage}>{repo.homepage}</a> : "None"}
    </p>
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
