import { Button, Paper, Link, Typography, NoSsr } from "@material-ui/core";
import marked from "marked";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import DOMPurify from "dompurify";

const id = ({ repo, readme, languages }) => (
  <div>
    <Head>
      <meta name="description" content={`Alex Lavallee's ${repo.name}`} />
      <title>{repo.name}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Paper style={{ margin: 10, padding: 10 }}>
      <Button href={`/${repo.owner.login}/repos`}>&#60; BACK</Button>
      <Typography>Name: {repo.name}</Typography>
      <Typography>Creator: {repo.owner.login}</Typography>
      <Typography>
        Language: {Object.keys(languages).slice(0, 3).join(", ")}
      </Typography>
      <Typography>
        License: {repo.license ? repo.license.name : "None"}
      </Typography>
      <Typography>
        Homepage:{" "}
        {repo.homepage ? <a href={repo.homepage}>{repo.homepage}</a> : "None"}
      </Typography>
      <Typography>
        Last Modified: {new Date(repo.updated_at).toDateString()}
      </Typography>
      <Typography>
        Link: <Link href={repo.html_url}>{repo.html_url}</Link>
      </Typography>
      <NoSsr>
        {/* eslint-disable-next-line react/no-danger */}
        <Typography
          component="div"
          dangerouslySetInnerHTML={{
            __html: process.browser ? DOMPurify(window).sanitize(readme) : "",
          }}
        />
      </NoSsr>
    </Paper>
  </div>
);

export default id;

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ user: string; name: string }>
) {
  const repo = await (
    await fetch(
      `https://api.github.com/repos/${context.params.user}/${context.params.name}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Token ${process.env.PAT}`,
        },
      }
    )
  ).json();
  const readmeData = await await fetch(
    repo.contents_url.replace("{+path}", "README.md"),
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Token ${process.env.PAT}`,
      },
    }
  );
  let readme = "";
  if (readmeData.ok) {
    readme = marked(
      await (
        await fetch((await readmeData.json()).download_url, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `Token ${process.env.PAT}`,
          },
        })
      ).text()
    );
  } else {
    readme = "No README Found";
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
    },
  };
}
