import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import PropTypes from "prop-types";

export default function Home({ repos, languages, name }) {
  return (
    <div>
      <Head>
        <meta name="description" content={`${name}'s Coding Portfolio`} />
        <title>Github Portfolio</title>
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

      {repos.map((repo, index) => (
        <Card key={repo.id} style={{ margin: 10, padding: 10 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {repo.name}
            </Typography>
            <Typography color="textSecondary">
              {Object.keys(languages[index]).slice(0, 3).join(", ")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href={`/repo/${repo.name}`}>
              View Repository Info
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
export async function getStaticProps() {
  const { name, login } = await (
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
    }, // will be passed to the page component as props
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
  name: PropTypes.string.isRequired,
};
