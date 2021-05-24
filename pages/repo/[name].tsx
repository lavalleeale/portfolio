import {
  Button,
  Paper,
  Link,
  Typography,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import Head from "next/head";

const id = ({ repo, readme, languages, name }) => (
  <div>
    <Head>
      <meta name="description" content={`${name}'s ${repo.name}`} />
      <title>{repo.name}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h3">
          <Link href="/" color="inherit" style={{ textDecoration: "none" }}>
            {name}&apos;s Portfolio
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
    <Toolbar />
    <Paper style={{ margin: 10, padding: 10 }}>
      <Button href="/">&#60; BACK</Button>
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
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const { name, login } = await (
    await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    })
  ).json();

  const repo = await (
    await fetch(
      `https://api.github.com/repos/${login}/${context.params.name}`,
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
  let readme = "";
  if (readmeData.download_url) {
    const readmeFile = await (
      await fetch(readmeData.download_url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Token ${process.env.PAT}`,
        },
      })
    ).text();
    readme = await (
      await fetch("https://api.github.com/markdown", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          text: readmeFile,
        }),
      })
    ).text();
  }

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
      name,
    },
  };
}
