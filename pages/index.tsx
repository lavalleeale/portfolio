import Head from "next/head";
import PropTypes from "prop-types";
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";

export default function Home({ repos, languages }) {
  return (
    <div>
      <Head>
        <meta name="description" content="Alex Lavallee's Coding Portfolio" />
        <title>Github Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {repos.map((repo, index) => (
        <Card key={repo.id} style={{ margin: 10, padding: 10 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {repo.name}
            </Typography>
            <Typography color="textSecondary">
              {Object.keys(languages[index]).slice(0, 3).join(", ")}
            </Typography>
            {/* <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />a benevolent smile
              </Typography> */}
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
