import { Button, Paper, Link, Typography } from "@material-ui/core";
import marked from "marked";
import Head from "next/head";

const id = ({ repo, readme, languages }) => (
  <div>
    <Head>
      <meta name="description" content={`Alex Lavallee's ${repo.name}`} />
      <title>{repo.name}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Paper style={{ margin: 10, padding: 10 }}>
      <Button href="/" style={{ marginTop: 10 }}>
        &#60; BACK
      </Button>
      <Typography>Name: {repo.name}</Typography>
      <Typography>
        Language: {Object.keys(languages).slice(0, 3).join(", ")}
      </Typography>
      <Typography>
        License: {repo.license ? repo.license.name : "None"}
      </Typography>
      <Typography>
        Homepage:{" "}
        {repo.homepage ? (
          <Link color="textPrimary" href={repo.homepage}>
            {repo.homepage}
          </Link>
        ) : (
          "None"
        )}
      </Typography>
      <Typography>
        Last Modified: {new Date(repo.updated_at).toDateString()}
      </Typography>
      <Typography>
        Link:{" "}
        <Link color="textPrimary" href={repo.html_url}>
          {repo.html_url}
        </Link>
      </Typography>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: readme }} />
    </Paper>
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
