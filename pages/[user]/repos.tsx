import Head from "next/head";
import PropTypes from "prop-types";
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import { GetServerSidePropsContext } from "next";

export default function AllRepos({ repos, languages, name }) {
  return (
    <div>
      <Head>
        <meta name="description" content={`${name}'s Coding Portfolio`} />
        <title>Github Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Card style={{ margin: 10, padding: 10 }}>
        <Button href="/">&#60; BACK</Button>
      </Card>
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
            <Button size="small" href={`repo/${repo.name}`}>
              View Repository Info
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
export async function getServerSideProps(
  context: GetServerSidePropsContext<{ user: string }>
) {
  const repos = await (
    await fetch(`https://api.github.com/users/${context.params.user}/repos`, {
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
    props: { repos, languages, name: context.params.user }, // will be passed to the page component as props
  };
}

AllRepos.propTypes = {
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
