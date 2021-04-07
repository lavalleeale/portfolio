import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import { FormEvent, useState } from "react";

export default function Home() {
  const [user, setUser] = useState("");
  return (
    <div>
      <Head>
        <meta name="description" content="Alex Lavallee's Coding Portfolio" />
        <title>Github Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Card style={{ margin: 10, padding: 10 }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Alex Lavallee
          </Typography>
          <Typography color="textSecondary">Example Portfolio</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href="/lavalleeale/repos">
            View Example Portfolio
          </Button>
        </CardActions>
      </Card>
      <Card style={{ margin: 10, padding: 10 }}>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            window.location.replace(`/${user}/repos`);
            return false;
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              View Your Own
            </Typography>
            <TextField
              placeholder="Github Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button size="small" href={`/${user}/repos`} type="submit">
              View Your Portfolio
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
}
